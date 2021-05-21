package org.project4.server.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.project4.server.common.view.LangVersionConstant;
import org.project4.server.common.view.ProjectMetaConstant;
import org.project4.server.common.view.TechVersionConstant;
import org.project4.server.config.custombean.DirectoryFiles;
import org.project4.server.domain.Comment;
import org.project4.server.domain.Project;
import org.project4.server.domain.User;
import org.project4.server.dto.CommentDTO;
import org.project4.server.dto.FileDTO;
import org.project4.server.dto.FilterDTO;
import org.project4.server.dto.RatingProjectDTO;
import org.project4.server.dto.ViewMoreDTO;
import org.project4.server.payload.CommentPayload;
import org.project4.server.payload.ProjectPayload;
import org.project4.server.repository.ProjectRepository;
import org.project4.server.service.common.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ProjectService extends CommonService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private VoteService voteService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private DirectoryFiles directoryFiles;

    public ResponseEntity<Object> getListProject(Long userId, Integer index) {

        Map<String, Object> entity;

        entity = gGetAllProject(userId, index);

        if (entity != null)
            return response(entity, HttpStatus.OK);

        return null;
    }

    private Map<String, Object> gGetAllProject(Long userId, Integer index) {
        Map<String, Object> entity = new HashMap<String, Object>();
        List<Project> rs = projectRepository.findByOrderByUpdateTimeDesc();

        entity.put("quantity", rs.size() - 5 * (index + 1));

        rs = new ArrayList<Project>(
                rs.subList(0 + 5 * index, Math.min(rs.size(), 5 + 5 * index)));

        gGetProjectPayload(userId, entity, rs);

        entity.put("quantity", projectRepository.count() - 5 * (index + 1));

        return objectMapper.convertValue(entity, Map.class);
    }

    public void gGetProjectPayload(Long userId, Map<String, Object> entity,
            List<Project> rs) {
        List<Object> l = new ArrayList<Object>();

        for (Project p : rs) {
            l.add(gGetProjectPayload(p, userId));
        }

        entity.put("projects", l);
    }

    private Map<String, Object> gGetProjectPayload(Project p, Long userId) {
        Map<String, Object> entity = new HashMap<String, Object>();
        User u = p.getUser();
        entity = gModelMapper(p);
        entity.put("user", u.getFullname());
        entity.put("starRating", voteService.getProjectStar(p.getId()));
        entity.put("numberVote", voteService.getNumberVote(p.getId()));
        entity.put("update", getTime(p.getCreateTime()));
        // n+1 ql (viet truy van de fix)
        if (userId != -1) {
            entity.put("userStar",
                    voteService.getUserRating(userId, p.getId()));
        } else
            entity.put("userStar", 0);
        return entity;
    }

    private Map<String, Object> gModelMapper(Project p) {
        ProjectPayload pPayload = modelMapper.map(p, ProjectPayload.class);
        return objectMapper.convertValue(pPayload, Map.class);
    }

    public ResponseEntity<Object> getFilterStar(Long userId, Long star,
            Integer index) {

        Map<String, Object> entity;

        int first = 0;
        int last = 5;

        if (star == 1) {
            last = 3;
        } else if (star == 2) {
            first = 3;
            last = 4;
        } else if (star == 3) {
            first = 4;
        }

        entity = gGetFilterStar(userId, first, last, index);

        if (entity != null)
            return response(entity, HttpStatus.OK);

        return null;

    }

    private Map<String, Object> gGetFilterStar(Long userId, int first, int last,
            Integer index) {
        Map<String, Object> entity = new HashMap<String, Object>();
        List<Project> rs = projectRepository.findAll();

        List<Object> l = new ArrayList<Object>();

        for (Project p : rs) {
            Map<String, Object> payload = gGetProjectPayload(p, userId);
            Double starRating = (Double) payload.get("starRating");
            if (starRating >= first && starRating <= last) {
                l.add(gGetProjectPayload(p, userId));
            }
        }
        entity.put("quantity", l.size() - 5 * (index + 1));

        l = new ArrayList<Object>(
                l.subList(0 + 5 * index, Math.min(l.size(), 5 + 5 * index)));

        entity.put("projects", l);

        return objectMapper.convertValue(entity, Map.class);
    }

    public ResponseEntity<Object> ratingProject(RatingProjectDTO dto,
            Long userId) {

        Map<String, Object> entity;
        Long id = dto.getId();
        Long userStar = dto.getUserStar();

        entity = badRequest(dto);
        if (entity != null)
            return response(entity, HttpStatus.FORBIDDEN);

        entity = rNotExistedProject(id);
        if (entity != null)
            return response(entity, HttpStatus.BAD_REQUEST);

        entity = rRatingSuccess(userId, dto);
        if (entity != null)
            return response(entity, HttpStatus.OK);

        return new ResponseEntity<Object>(entity, HttpStatus.OK);

    }

    private Map<String, Object> rNotExistedProject(Long id) {
        if (!projectRepository.existsById(id)) {
            Map<String, Object> errorEntity = new HashMap<String, Object>();
            errorEntity.put("message", "project is not existed");
            return createErrorPayload("409", "invalid_field", errorEntity);
        }
        return null;
    }

    private Map<String, Object> rRatingSuccess(Long userId,
            RatingProjectDTO dto) {

        voteService.saveOrUpdate(userId, dto);

        Map<String, Object> entity = new HashMap<String, Object>();
        entity.put("starRating", voteService.getProjectStar(dto.getId()));
        entity.put("numberVote", voteService.getNumberVote(dto.getId()));

        return entity;
    }

    public ResponseEntity<Object> getProject(Long userId, Long projectId) {
        Map<String, Object> entity;

        Project p = projectRepository.findById(projectId).get();

        entity = gGetDetailPayload(p, userId);

        if (entity != null)
            return response(entity, HttpStatus.OK);

        return null;
    }

    private Map<String, Object> gGetDetailPayload(Project p, Long userId) {
        Map<String, Object> entity = null;
        try {
            entity = gGetProjectPayload(p, userId);
            if (entity != null) {
                gAddTechSelect(entity, p.getTechnologi());
                gAddProjectMeta(entity, p.getTechnologi());
                gAddLangueVersion(entity, p.getLaguage());
                gAddStarProject(entity, p.getId());
            }
            return entity;
        } catch (Exception e) {
            e.printStackTrace();
            return entity;
        }
    }

    private void gAddStarProject(Map<String, Object> entity, Long id) {
        // TODO Auto-generated method stub
        List<Long> rs = new ArrayList<Long>();
        for (Long i = 1L; i <= 5L; i++) {
            rs.add(voteService.getCountStar(id, i));
        }
        entity.put("starCount", rs);
    }

    private void gAddTechSelect(Map<String, Object> entity, String technologi) {
        entity.put("techLabel",
                TechVersionConstant.TECH_VERSION.get(technologi));
    }

    private void gAddLangueVersion(Map<String, Object> entity, String laguage) {
        entity.put("langueVersionLabel",
                LangVersionConstant.LANG_VERSION.get(laguage));
    }

    private void gAddProjectMeta(Map<String, Object> entity,
            String technologi) {
        List<Object> rsList = new ArrayList<Object>();

        Map<String, Object> pjMeta = (Map<String, Object>) ProjectMetaConstant.PROJECT_META
                .get(technologi);

        for (String key : pjMeta.keySet()) {
            String value = pjMeta.get(key).toString();
            Map<String, Object> tmp = new HashMap<String, Object>();
            tmp.put("label", key);
            tmp.put("default", value);
            rsList.add(tmp);
        }

        entity.put("projectMeta", rsList);
    }

    public ResponseEntity<Object> getComment(Long id) {
        Map<String, Object> entity;

        entity = gGetComment(id);

        if (entity != null)
            return response(entity, HttpStatus.OK);

        return null;
    }

    private Map<String, Object> gGetComment(Long projectId) {
        Map<String, Object> rs = new HashMap<String, Object>();
        List<Map<String, Object>> lc = new ArrayList<Map<String, Object>>();
        List<Comment> comments = commentService.getCommentByProject(projectId);
        for (Comment c : comments) {
            Map<String, Object> entity = gCommentModelMapper(c);
            Long userId = (Long) ((Map<String, Object>) entity.get("user"))
                    .get("id");
            entity.put("update", getTime(c.getCreateTime()));
            entity.put("star", voteService.getUserRating(userId, projectId));
            lc.add(entity);
        }
        rs.put("comments", lc);
        return rs;
    }

    private Map<String, Object> gCommentModelMapper(Comment p) {
        CommentPayload cPayload = modelMapper.map(p, CommentPayload.class);
        return objectMapper.convertValue(cPayload, Map.class);
    }

    public ResponseEntity<Object> comment(CommentDTO dto, Long userId) {
        Map<String, Object> entity;

        entity = badRequest(dto);
        if (entity != null)
            return response(entity, HttpStatus.FORBIDDEN);

        entity = rNotExistedProject(dto.getProjectId());
        if (entity != null)
            return response(entity, HttpStatus.BAD_REQUEST);

        entity = cCommentSuccess(userId, dto);
        if (entity != null)
            return response(entity, HttpStatus.OK);

        return new ResponseEntity<Object>(entity, HttpStatus.OK);
    }

    private Map<String, Object> cCommentSuccess(Long userId, CommentDTO dto) {
        try {
            Map<String, Object> entity = new HashMap<String, Object>();
            commentService.saveOrUpdate(userId, dto);
            entity.put("status", "comment success");
            return entity;
        } catch (Exception e) {
            return null;
        }
    }

    public ResponseEntity<Object> download(String projectId) {
        String downloadPath = dPathDownload(projectId);
        return new ResponseEntity<Object>(downloadPath, HttpStatus.OK);
    }

    private String dPathDownload(String projectId) {

        String downloadPath = ServletUriComponentsBuilder
                .fromCurrentContextPath().build().toUriString() + "/" + "file"
                + "/" + "project" + "/" + md5.encoder(projectId) + "/"
                + dGetZipFile(Long.parseLong(projectId));
        return downloadPath;
    }

    public ResponseEntity<Object> treeFolder(Long id) {
        return new ResponseEntity<Object>(new HashMap<String, Object>() {
            {
                put("tree",
                        directoryFiles.listAllFileFolder(
                                "E:/file/project/" + md5.encoder(id.toString())
                                        + "/" + tGetChildFile(id)));
                put("name", tGetChildFile(id));
//                        put("key2", "value2");
            }
        }, HttpStatus.OK);
    }

    private String tGetChildFile(Long id) {
        return (String) directoryFiles
                .listAllFileFolder(
                        "E:/file/project/" + md5.encoder(id.toString()) + "/")
                .get(0).get("name");
    }

    public ResponseEntity<Object> getFile(FileDTO dto) {
        try {
            String p = pathProject(dto.getProjectId().toString());
            Path path = Paths.get(p + dto.getUrl());

            List<String> read = Files.readAllLines(path);

            return new ResponseEntity<Object>(read, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Object>("", HttpStatus.BAD_REQUEST);
        }

    }

    public ResponseEntity<Object> getListDocument(Long projectId) {
        return new ResponseEntity<Object>(new HashMap<String, Object>() {
            {

//                put("document",
//                        directoryFiles.listAllFileFolder("E:/file/project/"
//                                + md5.encoder(projectId.toString()) + "/"
//                                + tGetChildFile(projectId) + "/document"));
                
                put("document", directoryFiles.listAllFileWithContentFolder("E:/file/project/"
                        + md5.encoder(projectId.toString()) + "/"
                        + tGetChildFile(projectId) + "/document"));
                put("name", tGetChildFile(projectId));
            }
        }, HttpStatus.OK);
    }

    public ResponseEntity<Object> getNumberRs(FilterDTO dto) {
        List<String> languageArray = dto.getLanguage();
        List<String> techArray = dto.getTechnologi();

        Map<String, Object> entity;
        entity = gFilterProject(languageArray, techArray);

        if (entity != null)
            return response(entity, HttpStatus.OK);
        return response(entity, HttpStatus.BAD_REQUEST);
    }

    private Map<String, Object> gFilterProject(List<String> languageArray,
            List<String> techArray) {
        Map<String, Object> entity = new HashMap<String, Object>();
        if (techArray.size() == 0) {
            entity.put("number", projectRepository
                    .filterLanguageProject(languageArray).size());
            return entity;
        }
        if (languageArray.size() == 0) {
            entity.put("number",
                    projectRepository.filterTechProject(techArray).size());
            return entity;
        }
        entity.put("number", projectRepository
                .filterProject(languageArray, techArray).size());
        return entity;
    }

    public ResponseEntity<Object> getResult(FilterDTO dto, Long userId,
            Integer index) {
        List<String> languageArray = dto.getLanguage();
        List<String> techArray = dto.getTechnologi();

        Map<String, Object> entity;
        entity = gGetFilterResult(languageArray, techArray, userId, index);

        if (entity != null)
            return response(entity, HttpStatus.OK);
        return response(entity, HttpStatus.BAD_REQUEST);
    }

    private Map<String, Object> gGetFilterResult(List<String> languageArray,
            List<String> techArray, Long userId, Integer index) {
        Map<String, Object> entity = new HashMap<String, Object>();
        List<Project> rs;
        if (techArray.size() == 0) {
            rs = projectRepository.filterLanguageProject(languageArray);
        } else if (languageArray.size() == 0) {
            rs = projectRepository.filterTechProject(techArray);
        } else {
            rs = projectRepository.filterProject(languageArray, techArray);
        }

        entity.put("quantity", rs.size() - 5 * (index + 1));

        rs = new ArrayList<Project>(
                rs.subList(0 + 5 * index, Math.min(rs.size(), 5 + 5 * index)));
        gGetProjectPayload(userId, entity, rs);

        return objectMapper.convertValue(entity, Map.class);
    }

    public ResponseEntity<Object> sorted(String name, String type, Long userId,
            Integer index) {
        Map<String, Object> entity;
        entity = sSorted(name, type, userId, index);

        if (entity != null)
            return response(entity, HttpStatus.OK);
        return response(entity, HttpStatus.BAD_REQUEST);
    }

    private Map<String, Object> sSorted(String name, String type, Long userId,
            Integer index) {
        Map<String, Object> entity = new HashMap<String, Object>();
        List<Project> rs = null;

        if (name.equals("date")) {
            if (type.equals("asc"))
                rs = projectRepository.findByOrderByUpdateTimeAsc();
            if (type.equals("desc"))
                rs = projectRepository.findByOrderByUpdateTimeDesc();
        } else if (name.equals("view")) {
            if (type.equals("asc"))
                rs = projectRepository.findByOrderByViewsAsc();
            if (type.equals("desc"))
                rs = projectRepository.findByOrderByViewsDesc();
        } else if (name.equals("use")) {
            if (type.equals("asc"))
                rs = projectRepository.findByOrderByUsesAsc();
            if (type.equals("desc"))
                rs = projectRepository.findByOrderByUsesDesc();
        } else if (name.equals("vote")) {
            List<Long> sortedStar = voteService.getSortedStar();
            rs = new ArrayList<Project>();
            if (type.equals("asc")) {
                for (Long projectId : sortedStar) {
                    rs.add(projectRepository.findById(projectId).get());
                }
            }
            if (type.equals("desc")) {
                Collections.reverse(sortedStar);
                for (Long projectId : sortedStar) {
                    rs.add(projectRepository.findById(projectId).get());
                }
            }
        }

        entity.put("quantity", rs.size() - 5 * (index + 1));

        rs = new ArrayList<Project>(
                rs.subList(0 + 5 * index, Math.min(rs.size(), 5 + 5 * index)));

        gGetProjectPayload(userId, entity, rs);

        return objectMapper.convertValue(entity, Map.class);

    }

    private PageRequest Pageable(Integer index) {
        return PageRequest.of(index, 5);
    }

    public ResponseEntity<Object> viewMore(ViewMoreDTO dto, Long userId) {
        switch (dto.getLastAction()) {
        case "listProject":
            return getListProject(userId, dto.getIndex());
        case "filterStar":
            return getFilterStar(userId, dto.getFilterStar(), dto.getIndex());
        case "getResult":
            List<String> language = (List<String>) dto.getRequestBody()
                    .get("language");
            List<String> technologi = (List<String>) dto.getRequestBody()
                    .get("technologi");
            return getResult(new FilterDTO(language, technologi), userId,
                    dto.getIndex());
        case "sorted":
            return sorted((String) dto.getRequestBody().get("name"),
                    (String) dto.getRequestBody().get("type"), userId,
                    dto.getIndex());
        default:
            break;
        }
        return response(null, HttpStatus.BAD_REQUEST);
    }

}

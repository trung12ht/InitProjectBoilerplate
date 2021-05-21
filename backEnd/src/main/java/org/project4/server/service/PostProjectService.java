package org.project4.server.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.project4.server.common.view.LangVersionConstant;
import org.project4.server.common.view.TechVersionConstant;
import org.project4.server.config.custombean.DirectoryFiles;
import org.project4.server.domain.Project;
import org.project4.server.domain.User;
import org.project4.server.dto.LangTechDTO;
import org.project4.server.dto.PostProjectDTO;
import org.project4.server.repository.ProjectRepository;
import org.project4.server.service.common.CommonService;
import org.project4.server.service.common.FilesStorageService;
import org.project4.server.service.common.ZipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PostProjectService extends CommonService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private FilesStorageService fileStorageService;

    public ResponseEntity<Object> postProject(Long userId, PostProjectDTO map) {
        Map<String, Object> entity;

        entity = badRequest(map);
        if (entity != null)
            return response(entity, HttpStatus.FORBIDDEN);

        try {
            entity = pPostProjectSuccess(map, userId);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        if (entity != null)
            return response(entity, HttpStatus.OK);

        return new ResponseEntity<Object>(entity, HttpStatus.OK);
    }

    @Autowired
    private ZipService zipService;

    @Transactional(rollbackOn = { IOException.class })
    private Map<String, Object> pPostProjectSuccess(PostProjectDTO map,
            Long userId) throws IOException {
        Map<String, Object> entity = new HashMap<String, Object>();
        User user = findUserById(userId).get();
        Project project = projectRepository
                .saveAndFlush(new Project(map.getName(), "", map.getContent(),
                        map.getLanguage(), map.getTechnologi(), 0L, 0L, user));
        Long projectId = project.getId();
        pSaveFile(map, projectId);
        entity.put("status", "post project success");

        zipService.addDocumentToZip(map.getDocuments(), projectId);
        zipService.unZipFile(projectId);
        return entity;
    }

    private void pSaveFile(PostProjectDTO map, Long projectId)
            throws IOException {
        Files.createDirectories(Paths.get(pathProject(projectId.toString())));
        fileStorageService.save(pathProject(projectId.toString()),
                map.getFileZip());
    }

    public ResponseEntity<Object> getLabel() {
        Map<String, Object> entity = getLabelPayload();
        return response(entity, HttpStatus.OK);
    }

    private Map<String, Object> getLabelPayload() {
        return new HashMap<String, Object>() {
            {
                put("langVersion", LangVersionConstant.LANG_VERSION_LABEL);
                put("techVersion", TechVersionConstant.TECH_VISION_LABEL);
                put("langMaping", LangVersionConstant.MAPING_TECH);
            }
        };
    }

    private static final String DOCUMENT_PATH = "E:/file/documents/";

    @Autowired
    private DirectoryFiles directoryFiles;

    public ResponseEntity<Object> getListDocument(LangTechDTO dto) {
        Map<String, Object> entity = new HashMap<String, Object>();
        entity.put("documents", directoryFiles.listAllFileWithContentFolder(
                DOCUMENT_PATH + dto.getLanguage() + "-" + dto.getTechnologi()));
        return response(entity, HttpStatus.OK);
    }

    public ResponseEntity<Object> getDocument(LangTechDTO dto) {
        Path path = Paths.get(DOCUMENT_PATH + dto.getLanguage() + "-"
                + dto.getTechnologi() + "/" + dto.getDocument());
        try {
            List<String> read = Files.readAllLines(path);
            return new ResponseEntity<Object>(read, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}

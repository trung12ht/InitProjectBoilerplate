package org.project4.server.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.project4.server.domain.Project;
import org.project4.server.dto.CommentDTO;
import org.project4.server.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ManagementProjectService extends CommentService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private ProjectService projectService;
    
    @Autowired
    private ObjectMapper objectMapper;

    public ResponseEntity<Object> getListProject(Long userId) {
        Map<String, Object> entity;

        entity = gGetAllProject(userId);

        if (entity != null)
            return response(entity, HttpStatus.OK);

        return null;
    }

    private Map<String, Object> gGetAllProject(Long userId) {
        Map<String, Object> entity = new HashMap<String, Object>();
        
        List<Project> rs = projectRepository.findByUser(findUserById(userId));
        
        projectService.gGetProjectPayload(userId, entity, rs);

        return objectMapper.convertValue(entity, Map.class);
    }

    public ResponseEntity<Object> deleteProject(Long projectId, Long userId) {
        Map<String, Object> entity;

        entity = dDeleteProject(projectId, userId);

        if (entity != null)
            return response(entity, HttpStatus.OK);

        return null;
    }

    private Map<String, Object> dDeleteProject(Long projectId, Long userId) {
        try {
            Map<String, Object> entity = new HashMap<String, Object>();
            projectRepository.deleteById(projectId);;
            entity.put("status", "delete success");
            return entity;
        } catch (Exception e) {
            return null;
        }
    }
}

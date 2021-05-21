package org.project4.server.controller;

import org.project4.server.controller.common.CommonController;
import org.project4.server.service.ManagementProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/managementProject")
public class ManagementProjectController extends CommonController {
    
    @Autowired
    private ManagementProjectService managementProjectService;
    
    @GetMapping(path = "/listProject", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> listProject(
            @RequestHeader(value = "Authorization") String authorization) {
        return managementProjectService.getListProject(getUserId(authorization));
    }
    
    @GetMapping(path = "/deleteProject/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> deleteProject(
            @RequestHeader(value = "Authorization") String authorization,
            @PathVariable(value = "id") Long projectId) {
        return managementProjectService.deleteProject(projectId, getUserId(authorization));
    }
    
}

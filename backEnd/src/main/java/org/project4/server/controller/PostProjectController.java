package org.project4.server.controller;

import org.project4.server.controller.common.CommonController;
import org.project4.server.dto.LangTechDTO;
import org.project4.server.dto.PostProjectDTO;
import org.project4.server.service.PostProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/postProject")
public class PostProjectController extends CommonController {
    
    @Autowired
    private PostProjectService postProjectService;

    @PostMapping(path = "")
    public ResponseEntity<Object> postProject(PostProjectDTO map,
            @RequestHeader(value = "Authorization") String authorization) {
        return postProjectService.postProject(getUserId(authorization), map); 
    }
    
    @GetMapping(path = "/getLabel", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getLabel() {
        return postProjectService.getLabel();
    }
    
    @PostMapping(path = "/getListDocument", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getListDocument(@RequestBody(required = true) LangTechDTO dto) {
        return postProjectService.getListDocument(dto);
    }
    
    @PostMapping(path = "/getDocument", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getDocument(@RequestBody(required = true) LangTechDTO dto) {
        return postProjectService.getDocument(dto);
    }
    
}

package org.project4.server.controller;

import java.util.Map;

import org.project4.server.config.custombean.DirectoryFiles;
import org.project4.server.controller.common.CommonController;
import org.project4.server.dto.CommentDTO;
import org.project4.server.dto.FileDTO;
import org.project4.server.dto.FilterDTO;
import org.project4.server.dto.ProjectDTO;
import org.project4.server.dto.RatingProjectDTO;
import org.project4.server.dto.ViewMoreDTO;
import org.project4.server.service.ProjectService;
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
@RequestMapping("/project")
public class ProjectController extends CommonController {

    @Autowired
    private ProjectService projectService;

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getProject(
            @PathVariable(value = "id") Long id,
            @RequestHeader(value = "Authorization") String authorization) {
        return projectService.getProject(getUserId(authorization), id);
    }

    @GetMapping(path = "/listProject", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> listProject(
            @RequestHeader(value = "Authorization") String authorization) {
        return projectService.getListProject(getUserId(authorization), 0);
    }

    @GetMapping(path = "/filterStar/{star}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> filterStar(
            @PathVariable(value = "star") Long star,
            @RequestHeader(value = "Authorization") String authorization) {
        return projectService.getFilterStar(getUserId(authorization), star, 0);
    }

    @PostMapping(path = "/rating", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> ratingProject(
            @RequestBody(required = true) RatingProjectDTO dto,
            @RequestHeader(value = "Authorization") String authorization) {
        return projectService.ratingProject(dto,
                getUser(authorization).getId());
    }

    @GetMapping(path = "/getComment/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getComment(
            @PathVariable(value = "id") Long id,
            @RequestHeader(value = "Authorization") String authorization) {
        return projectService.getComment(id);
    }

    @PostMapping(path = "/comment", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> comment(
            @RequestBody(required = true) CommentDTO dto,
            @RequestHeader(value = "Authorization") String authorization) {
        return projectService.comment(dto, getUser(authorization).getId());
    }

    @PostMapping(path = "/download", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> download(
            @RequestBody(required = true) ProjectDTO dto,
            @RequestHeader(value = "Authorization") String authorization) {
        return projectService.download(dto.getProjectId());
    }

    @GetMapping(path = "/treeFolder/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> treeFolder(
            @PathVariable(value = "id") Long id,
            @RequestHeader(value = "Authorization") String authorization) {
        return projectService.treeFolder(id);
    }

    @PostMapping(path = "/getFile", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getFile(
            @RequestBody(required = true) FileDTO dto,
            @RequestHeader(value = "Authorization") String authorization) {
        return projectService.getFile(dto);
    }

    @PostMapping(path = "/listDocument/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getListDocument(
            @PathVariable(value = "id") Long projectId,
            @RequestHeader(value = "Authorization") String authorization) {
        return projectService.getListDocument(projectId);
    }

    @PostMapping(path = "/getNumberRs", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getNumberRs(
            @RequestBody(required = true) FilterDTO dto) {
        return projectService.getNumberRs(dto);
    }

    @PostMapping(path = "/getResult", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getResult(
            @RequestBody(required = true) FilterDTO dto,
            @RequestHeader(value = "Authorization") String authorization) {
        return projectService.getResult(dto, getUser(authorization).getId(), 0);
    }

    @PostMapping(path = "/sorted", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> sorted(
            @RequestBody(required = true) Map<String, String> dto,
            @RequestHeader(value = "Authorization") String authorization) {
        return projectService.sorted(dto.get("name"), dto.get("type"),
                getUser(authorization).getId(), 0);
    }

    @PostMapping(path = "/viewMore", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> viewMore(
            @RequestBody(required = true) ViewMoreDTO dto,
            @RequestHeader(value = "Authorization") String authorization) {
        return projectService.viewMore(dto, getUser(authorization).getId());
    }

}
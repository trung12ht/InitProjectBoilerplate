package org.project4.server.controller;

import org.project4.server.dto.CreateUserDTO;
import org.project4.server.dto.VerifyUserDTO;
import org.project4.server.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/users")
public class UsersController {
    
    @Autowired
    private UsersService loginService;
    
    @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> login(@RequestBody(required = true) VerifyUserDTO dto) {
        return loginService.login(dto);
    }
    
    @PostMapping(path = "/signin", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> signin(@RequestBody(required = true) CreateUserDTO dto) {
        return loginService.signin(dto);
    }

}

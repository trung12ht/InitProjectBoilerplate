package org.project4.server.service;

import java.util.HashMap;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.project4.server.common.JWTConstance;
import org.project4.server.domain.User;
import org.project4.server.dto.CreateUserDTO;
import org.project4.server.dto.VerifyUserDTO;
import org.project4.server.repository.UserRepository;
import org.project4.server.service.common.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService extends CommonService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<Object> signin(CreateUserDTO dto) {
    
        Map<String, Object> entity;
        String email = dto.getEmail();
    
        entity = badRequest(dto);
        if (entity != null)
            return response(entity, HttpStatus.FORBIDDEN);
    
        entity = sExistedUser(email);
        if (entity != null)
            return response(entity, HttpStatus.BAD_REQUEST);
    
        entity = sUserCreate(dto);
        if (entity != null)
            return response(entity, HttpStatus.CREATED);
    
        return new ResponseEntity<Object>(entity, HttpStatus.OK);
    }

    private Map<String, Object> sExistedUser(String email) {
        if (userRepository.existsByEmail(email)) {
            Map<String, Object> errorEntity = new HashMap<String, Object>();
            errorEntity.put("message", "user is existed");
            return createErrorPayload("409", "invalid_field", errorEntity);
        }
        return null;
    }

    private Map<String, Object> sUserCreate(CreateUserDTO dto) {
        if (!userRepository.existsByEmail(dto.getEmail())) {
    
            User user = modelMapper.map(dto, User.class);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
    
            Map<String, Object> entity = new HashMap<String, Object>();
            entity.put("message", "user created");
    
            return entity;
        }
        return null;
    }

    public ResponseEntity<Object> login(VerifyUserDTO dto) {
    
        Map<String, Object> entity;
        String email = dto.getCredential().getEmail();
        String password = dto.getCredential().getPassword();
    
        entity = lMissingField(email, password);
        if (entity != null)
            return response(entity, HttpStatus.BAD_REQUEST);
    
        entity = lIncorrectLogin(email, password);
        if (entity != null)
            return response(entity, HttpStatus.FORBIDDEN);
    
        entity = lUserTokenCreated(email, password);
        if (entity != null)
            return response(entity, HttpStatus.OK);
    
        return new ResponseEntity<Object>("", HttpStatus.OK);
    
    }

    private Map<String, Object> lIncorrectLogin(String email, String password) {
        if (getToken(email, password).equals("")) {

            Map<String, Object> errorEntity = new HashMap<String, Object>();
            errorEntity.put("message", "Incorrect username or password");

            return createErrorPayload("403", "invalid_field", errorEntity);

        }
        return null;
    }

    private Map<String, Object> lUserTokenCreated(String email,
            String password) {
        String token = getToken(email, password);
        if (!token.equals("")) {
            User user = userRepository.findByEmail(email);

            Map<String, Object> entity = new HashMap<String, Object>();

            Map<String, Object> successEntity = new HashMap<String, Object>();
            
            successEntity.put("user_id", user.getId());
            successEntity.put("user_name", user.getFullname());
            successEntity.put("token", token);
            user.setToken(token);
            successEntity.put("expire_in", JWTConstance.JWT_EXPIRATION);
            entity.put("user_token", successEntity);
            
            userRepository.save(user);
            return entity;
        } else
            return null;
    }

    private Map<String, Object> lMissingField(String email, String password) {
        if (email == null || password == null) {
            Map<String, Object> errorEntity = new HashMap<String, Object>();
            errorEntity.put("message", "missing username or password");
            return createErrorPayload("400", "missing_field", errorEntity);
        } else
            return null;
    }

}

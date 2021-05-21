package org.project4.server.service.common;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.project4.server.config.custombean.DirectoryFiles;
import org.project4.server.domain.User;
import org.project4.server.domain.common.CommonDomain;
import org.project4.server.repository.UserRepository;
import org.project4.server.security.jwt.CustomUserDetails;
import org.project4.server.security.jwt.JwtTokenProvider;
import org.project4.server.security.md5.Md5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CommonService {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    protected Md5 md5;
    @Autowired
    private DirectoryFiles directoryFiles;
    
    public String dGetZipFile(Long id) {
        return (String) directoryFiles
                .listAllFileFolder(
                        "E:/file/project/" + md5.encoder(id.toString()) + "/")
                .get(1).get("name");
    }
    
    public String dGetZipFilePost(Long id) {
        return (String) directoryFiles
                .listAllFileFolder(
                        "E:/file/project/" + md5.encoder(id.toString()) + "/")
                .get(0).get("name");
    }
    
    public void setUpdateInfo(Long userId, CommonDomain c) {
        c.setUpdateTime(LocalDateTime.now());
        c.setUpdateUser(userId);
    }
    
    public Map<String, Object> badRequest(Object dto) {
        try {
            List<String> arrayValidate = arrayValidateObject(dto);
            if (arrayValidate != null) {
                ArrayList<Object> errorEntitys = new ArrayList<>();
                for (String s : arrayValidate) {
                    Map<String, Object> errorEntity = new HashMap<String, Object>();
                    errorEntity.put("message", s);
                    errorEntity.put("msg", s + " is required");
                    errorEntitys.add(errorEntity);
                }
                return createErrorPayload("400", "missing_field", errorEntitys);
            } else
                return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public ArrayList<String> arrayValidateObject(Object object) throws IllegalAccessException {
        ArrayList<String> rs = new ArrayList<String>();
        for (Field f : object.getClass().getDeclaredFields()) {
            f.setAccessible(true);
            if (f.get(object) == null)
                rs.add(f.getName());
        }  
        if (rs.isEmpty()) return null;
        return rs;            
    }
    
    public Map<String, Object> createErrorPayload(String status, String type,
            Object errorJson) {
        HashMap<String, Object> entity = new HashMap<String, Object>();
        entity.put("status", status);
        entity.put("type", type);
        entity.put("error", errorJson);
        return entity;
    }
    
    public ResponseEntity<Object> response(Map<String, Object> entity, HttpStatus status){
        return new ResponseEntity<Object>(entity, status);
    }
    
    public String getToken(String email, String password) {
        String jwt = "";
        try {
            // Xác thực từ username và password.
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));

            // Nếu không xảy ra exception tức là thông tin hợp lệ
            // Set thông tin authentication vào Security Context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Trả về jwt cho người dùng.
            jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jwt;
    }
    
    public String getTime(LocalDateTime time) {
        StringBuffer rs = new StringBuffer();
        rs.append(time.getHour()).append(":")
        .append(time.getMinute()).append(":")
        .append(time.getSecond()).append(" ")
        .append(time.getDayOfMonth()).append("-")
        .append(time.getMonth().toString().toLowerCase()).append("-")
        .append(time.getYear());
        return  rs.toString();
    }
    
    public Optional<User> findUserById(Long userId) {
        return userRepository.findById(userId);
    }
    
    public String pathProject(String projectId) {
        return "E:/file/project/" + md5.encoder(projectId) + "/";
    }

    
}

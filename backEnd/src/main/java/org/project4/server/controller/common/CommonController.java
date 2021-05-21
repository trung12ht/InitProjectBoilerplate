package org.project4.server.controller.common;

import org.project4.server.domain.User;
import org.project4.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class CommonController {
    
    @Autowired
    private UserRepository userRepository;
    
    public User getUser(String authorization) {
        return userRepository.findByToken(authorization);
    }
    
    public Long getUserId(String authorization) {
        User user = getUser(authorization);
        Long userId = -1L;
        if (user!= null) userId = user.getId();
        return userId;
    }
    
}

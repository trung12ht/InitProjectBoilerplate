package org.project4.server.config;

import org.project4.server.security.md5.Md5;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EncoderConfig {
    
    @Bean
    public Md5 md5() {
        return new Md5();
    }
    
}

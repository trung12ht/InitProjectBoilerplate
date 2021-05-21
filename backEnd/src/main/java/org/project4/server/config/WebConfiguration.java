package org.project4.server.config;

import org.modelmapper.ModelMapper;
import org.project4.server.config.custombean.DirectoryFiles;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
public class WebConfiguration extends WebMvcConfigurationSupport {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/file/**").addResourceLocations("file:E:/file/");
        super.addResourceHandlers(registry);
   }
    
    @Bean
    public DirectoryFiles directoryFile() {
        return new DirectoryFiles();
    } 
    
}

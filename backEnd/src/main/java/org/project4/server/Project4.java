package org.project4.server;

import org.project4.server.config.custombean.DirectoryFiles;
import org.project4.server.repository.ProjectRepository;
import org.project4.server.security.md5.Md5;
import org.project4.server.service.common.ZipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Project4 implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(Project4.class, args);
    }

    @Autowired
    private Md5 md5;

    @Autowired
    private DirectoryFiles directoryFiles;
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private ZipService zipService;

    @Override
    public void run(String... args) throws Exception {
//       
//        zipService.addToZip("pom.xml",(long) -2);
        
    }

}

package org.project4.server.common.view;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ProjectMetaConstant {

    public static final Map<String, Object> SPRING_BOOT = new HashMap<String, Object>() {
        {
            put("Group", "com.example");
            put("Artifact", "demo");
            put("Name", "demo");
            put("Description", "Demo project for Spring Boot");
        }
    };

    public static final Map<String, Object> NODE_JS = new HashMap<String, Object>() {
        {
            put("name", "nodejs-example");
            put("author", "Your name here!");
            put("license", "MIT");
        }
    };
    
    public static final Map<String, Object> REACT_JS = new HashMap<String, Object>() {
        {
            put("name", "reactjs-example");
            put("author", "Your name here!");
            put("license", "MIT");
        }
    };

    public static final Map<String, Object> PROJECT_META = new HashMap<String, Object>() {
        {
            put("Spring Boot", SPRING_BOOT);
            put("NodeJS", NODE_JS);
            put("ReactJS", REACT_JS);
        }
    };

    public static final List<String> PROJECT_META_LABEL = new ArrayList<String>() {
        {
            for (String langVersion : PROJECT_META.keySet()) {
                add(langVersion);
            }
        }
    };

}

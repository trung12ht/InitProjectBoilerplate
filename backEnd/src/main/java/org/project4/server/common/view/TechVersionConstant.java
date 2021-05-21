package org.project4.server.common.view;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TechVersionConstant {
    public static final String SPRING_BOOT = "Spring Boot";
    public static final String NODEJS = "NodeJS";
    public static final String REACTJS = "ReactJS";
    
    public static final String[] SPRING_BOOT_VESION = { "2.5.0 (SNAPSHOT)",
            "2.5.0 (M3)", "2.4.5 (SNAPSHOT)", "2.4.4", "2.3.10 (SNAPSHOT)",
            "2.3.9" };
    public static final String[] NODE_JS_VESION = { "15.13.0",
            "14.8.0", "13.0.0", "12.11.0", "11.7.0"};
    public static final String[] REACTJS_VESION = { "17.0.0",
            "16.7", "16.0", "15.6"};

    public static final Map<String, Object> TECH_VERSION = new HashMap<String, Object>() {
        {
            put(SPRING_BOOT, SPRING_BOOT_VESION);
            put(NODEJS, NODE_JS_VESION);
            put(REACTJS, REACTJS_VESION);
        }
    };
    
    public static final List<String> TECH_VISION_LABEL = new ArrayList<String>() {
        {
            for ( String techVersion : TECH_VERSION.keySet() ) {
                add(techVersion);
            }
        }
    };
    
}

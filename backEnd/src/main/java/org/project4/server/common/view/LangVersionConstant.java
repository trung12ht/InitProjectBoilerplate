package org.project4.server.common.view;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LangVersionConstant {
    public static final String JAVA = "Java";
    public static final String JAVASCRIPT = "Javascript";

    public static final String[] JAVA_VERSION = { "16", "11", "8" };
    public static final String[] JAVASCRIPT_VERSION = { "ES4", "ES5", "ES6" };

    public static final Map<String, Object> LANG_VERSION = new HashMap<String, Object>() {
        {
            put(JAVA, JAVA_VERSION);
            put(JAVASCRIPT, JAVASCRIPT_VERSION);
        }
    };
    
    public static final List<String> LANG_VERSION_LABEL = new ArrayList<String>() {
        {
            for ( String langVersion : LANG_VERSION.keySet() ) {
                add(langVersion);
            }
        }
    };
    
    public static final Map<String, Object> MAPING_TECH = new HashMap<String, Object>() {
        {
            put(JAVA, new ArrayList<String>() {
                {
                    add(TechVersionConstant.SPRING_BOOT);
                }
            });
            put(JAVASCRIPT, new ArrayList<String>() {
                {
                    add(TechVersionConstant.NODEJS);
                    add(TechVersionConstant.REACTJS);
                }
            });
        }
    };

}

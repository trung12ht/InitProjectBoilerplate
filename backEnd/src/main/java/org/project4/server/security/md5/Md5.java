package org.project4.server.security.md5;

import org.apache.commons.codec.digest.DigestUtils;

public class Md5 {
    
    public String encoder(String password) {
//        String hash = "35454B055CC325EA1AF2126E27707052";
//        String password = "ILoveJava";
        return DigestUtils.md5Hex(password).toUpperCase();
    }
    
}

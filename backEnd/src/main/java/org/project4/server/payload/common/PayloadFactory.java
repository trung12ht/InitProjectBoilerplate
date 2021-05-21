package org.project4.server.payload.common;

import java.util.HashMap;
import java.util.Map;

import org.project4.server.common.PayloadConstance;

public class PayloadFactory {

    private static PayloadFactory instance;

    private PayloadFactory() {
    };

    public static PayloadFactory instance() {
        if (instance == null) {
            instance = new PayloadFactory();
        }
        return instance;
    }

    private HashMap<PayloadConstance, CommonPayload> registerPayLoad = new HashMap<PayloadConstance, CommonPayload>();

    public void registerPayload(PayloadConstance payload, CommonPayload p) {
        registerPayLoad.put(payload, p);
    }

    public Map<String, Object> createPayload(PayloadConstance payload) {
        return (Map<String, Object>) registerPayLoad.get(payload)
                .createPayload();
    }

}

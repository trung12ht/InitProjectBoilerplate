package org.project4.server.payload.common;

import java.util.Map;

import org.springframework.boot.configurationprocessor.json.JSONObject;

public abstract class CommonPayload {
    protected abstract Map<String, Object> createPayload();
}

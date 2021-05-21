package org.project4.server.dto;

import java.util.Map;

import org.project4.server.dto.child.Credential;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ViewMoreDTO {
    private String lastAction;
    private Long filterStar;
    private Map<String, Object> requestBody;
    private Integer index;
    private String name;
    private String type;
}

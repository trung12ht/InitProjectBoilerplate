package org.project4.server.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FileDTO {
    private String url;
    private Long projectId;
}

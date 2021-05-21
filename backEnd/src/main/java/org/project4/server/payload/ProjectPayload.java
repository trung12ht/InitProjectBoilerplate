package org.project4.server.payload;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProjectPayload {
    private String id;
    private String name;
    private String title;
    private String content;
    private String laguage;
    private String technologi;
    private Long views;
    private Long uses;
}

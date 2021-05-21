package org.project4.server.dto.child;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DocumentsDTO {
    private String name;
    private List<String> content;
}

package org.project4.server.dto;

import java.util.List;

import org.project4.server.dto.child.DocumentsDTO;
import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostProjectDTO {
    private String content;
    private MultipartFile fileZip;
    private String name;
    private String language;
    private String technologi;
    private List<DocumentsDTO> documents;
}

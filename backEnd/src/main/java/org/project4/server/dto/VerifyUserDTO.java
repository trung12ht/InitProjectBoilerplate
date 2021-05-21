package org.project4.server.dto;

import org.project4.server.dto.child.Credential;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class VerifyUserDTO {
    private Credential credential;
}

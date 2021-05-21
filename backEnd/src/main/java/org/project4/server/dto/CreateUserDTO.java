package org.project4.server.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateUserDTO {
    private String fullname;
    private String email;
    private String password;
    private String verifyPassword;
}

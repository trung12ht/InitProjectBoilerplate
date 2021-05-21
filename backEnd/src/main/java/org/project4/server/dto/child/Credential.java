package org.project4.server.dto.child;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Credential {
    private String email;
    private String password;
}

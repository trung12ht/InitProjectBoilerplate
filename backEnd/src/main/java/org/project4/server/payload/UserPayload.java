package org.project4.server.payload;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserPayload {
    private String fullName;
    private Long id;
}

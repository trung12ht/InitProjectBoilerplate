package org.project4.server.payload;

import java.time.LocalDateTime;

import org.project4.server.domain.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentPayload {
    private String content;
    private UserPayload user;
}

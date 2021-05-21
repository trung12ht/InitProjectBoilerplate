package org.project4.server.payload;

import org.springframework.beans.factory.annotation.Value;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SortStarPayload {
    @Value("#{target.id}")
    private Long projectId;
}

package org.project4.server.domain.common;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
public abstract class CommonDomain {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long createUser;
    private Long updateUser;
    @Column(name = "create_time")
    private LocalDateTime createTime;
    @Column(name = "update_time")   
    private LocalDateTime updateTime;

    public CommonDomain() {
        super();
        this.createTime = LocalDateTime.now();
        this.updateTime = LocalDateTime.now();
    }

}

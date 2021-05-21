package org.project4.server.domain;

import javax.persistence.Entity;

import org.project4.server.domain.common.CommonDomain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class BlackToken extends CommonDomain{
	private String token;
}

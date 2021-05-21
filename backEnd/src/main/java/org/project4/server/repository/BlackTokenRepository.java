package org.project4.server.repository;
import org.project4.server.domain.BlackToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("BlackTokenRepository")
public interface BlackTokenRepository  extends JpaRepository<BlackToken, Long>{
	boolean existsByToken(String jwt);
}

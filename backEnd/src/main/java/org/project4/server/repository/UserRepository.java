package org.project4.server.repository;

import org.project4.server.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("UserRepository")
public interface UserRepository  extends JpaRepository<User, Long> {
	User findByEmail(String username);

    boolean existsByEmail(String email);

    boolean existsByPassword(String password);

    User findByToken(String authorization);
    
}
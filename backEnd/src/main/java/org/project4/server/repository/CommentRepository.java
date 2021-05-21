package org.project4.server.repository;

import java.util.List;

import org.project4.server.domain.BlackToken;
import org.project4.server.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("CommentRepository")
public interface CommentRepository  extends JpaRepository<Comment, Long>{

    List<Comment> findByProjectId(Long projectId);

    boolean existsByUserIdAndProjectId(Long userId, Long projectId);

    Comment findByUserIdAndProjectId(Long userId, Long projectId);

    List<Comment> findTop3ByProjectIdOrderByUpdateTimeDesc(Long projectId);

}

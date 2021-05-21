package org.project4.server.repository;

import java.util.List;

import org.project4.server.domain.Vote;
import org.project4.server.payload.SortStarPayload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository("VoteRepository")
public interface VoteRepository extends JpaRepository<Vote, Long> {

    List<Vote> findByProjectId(Long id);

    Long countByProjectId(Long id);

    boolean existsByUserIdAndProjectId(Long userId, Long id);

    Vote findByUserIdAndProjectId(Long userId, Long id);

    Long countByProjectIdAndStar(Long projectId, Long star);

    @Query("SELECT DISTINCT v.projectId \r\n" + 
            " FROM Vote v \r\n" + 
            " GROUP BY v.projectId\r\n" + 
            " ORDER BY AVG(v.star)")
    List<Long> sortedStar();

}
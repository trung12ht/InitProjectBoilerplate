package org.project4.server.service;

import java.util.List;

import org.project4.server.domain.Vote;
import org.project4.server.dto.RatingProjectDTO;
import org.project4.server.payload.SortStarPayload;
import org.project4.server.repository.VoteRepository;
import org.project4.server.service.common.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoteService extends CommonService {

    public Double getProjectStar(Long id) {
        List<Vote> votes = voteRepository.findByProjectId(id);
        Double rating = (double) 0;
        Long numVote = getNumberVote(id);

        if (numVote == 0)
            return (double) 0;
        for (Vote v : votes) {
            rating += v.getStar();
        }

        return Math.round(rating / numVote * 100.0) / 100.0;
    }

    public Long getCountStar(Long projectId, Long star) {
        return voteRepository.countByProjectIdAndStar(projectId, star);
    }

    public Long getNumberVote(Long id) {
        return voteRepository.countByProjectId(id);
    }

    public void saveOrUpdate(Long userId, RatingProjectDTO dto) {
        if (voteRepository.existsByUserIdAndProjectId(userId, dto.getId())) {
            Vote v = voteRepository.findByUserIdAndProjectId(userId,
                    dto.getId());
            setUpdateInfo(userId, v);
            v.setStar(dto.getUserStar());
            voteRepository.save(v);
            return;
        }
        voteRepository.save(new Vote(userId, dto.getId(), dto.getUserStar()));
    }

    public Long getUserRating(Long userId, Long projectId) {
        if (!voteRepository.existsByUserIdAndProjectId(userId, projectId))
            return 0L;
        else
            return voteRepository.findByUserIdAndProjectId(userId, projectId)
                    .getStar();
    }
    
    public List<Long> getSortedStar() {
        return voteRepository.sortedStar();
//        return null;
    }

    @Autowired
    private VoteRepository voteRepository;
}

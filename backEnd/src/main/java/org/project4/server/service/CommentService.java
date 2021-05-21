package org.project4.server.service;

import java.util.List;

import org.project4.server.domain.Comment;
import org.project4.server.domain.Vote;
import org.project4.server.dto.CommentDTO;
import org.project4.server.repository.CommentRepository;
import org.project4.server.service.common.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService extends CommonService {

    public Long getStarVote(String projectId, String userId) {
        return 0L;
    }

    public List<Comment> getCommentByProject(Long projectId) {
        return commentRepository.findTop3ByProjectIdOrderByUpdateTimeDesc(projectId);
    }

    public void saveOrUpdate(Long userId, CommentDTO dto) {
        if (commentRepository.existsByUserIdAndProjectId(userId,
                dto.getProjectId())) {
            Comment c = commentRepository.findByUserIdAndProjectId(userId,
                    dto.getProjectId());
            setUpdateInfo(userId, c);
            c.setContent(dto.getComment());
            commentRepository.save(c);
            return;
        }
        Comment c = commentRepository.save(new Comment(dto.getComment(),
                findUserById(userId).get(), dto.getProjectId()));
        System.out.println(c.getId());
    }

    @Autowired
    private CommentRepository commentRepository;

}

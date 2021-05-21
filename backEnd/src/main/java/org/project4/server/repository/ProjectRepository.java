package org.project4.server.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.project4.server.domain.Comment;
import org.project4.server.domain.Project;
import org.project4.server.domain.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository("ProjectRepository")
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("select                          \r\n" + 
            "    p                          \r\n" + 
            "from                           \r\n" + 
            "    Project p                  \r\n" + 
            "where                          \r\n" + 
            "    p.laguage in (:lArray)     \r\n" + 
            "    and p.technologi in (:tArray)")
    List<Project> filterProject(@Param("lArray") List<String> languageArray,
            @Param("tArray") List<String> techArray);

    @Query("select                          \r\n" + 
            "    p                          \r\n" + 
            "from                           \r\n" + 
            "    Project p                  \r\n" + 
            "where                          \r\n" + 
            "    p.laguage in (:lArray)     \r\n")
    List<Project> filterLanguageProject(@Param("lArray") List<String> languageArray);

    @Query("select                          \r\n" + 
            "    p                          \r\n" + 
            "from                           \r\n" + 
            "    Project p                  \r\n" + 
            "where                          \r\n" + 
            "    p.technologi in (:tArray)")
    List<Project> filterTechProject(@Param("tArray") List<String> techArray);

    List<Project> findByOrderByUpdateTimeAsc();

    List<Project> findByOrderByUpdateTimeDesc();

    List<Project> findByOrderByViewsDesc();

    List<Project> findByOrderByViewsAsc();

    List<Project> findByOrderByUsesAsc();

    List<Project> findByOrderByUsesDesc();

    List<Project> findByUser(Optional<User> findUserById);


}

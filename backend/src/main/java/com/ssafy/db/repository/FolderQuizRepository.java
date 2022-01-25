package com.ssafy.db.repository;

import com.ssafy.db.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolderQuizRepository extends JpaRepository<FolderQuiz, Long> {
    List<FolderQuiz> findByFolder(Folder folder);
    List<FolderQuiz> findByQuiz(Quiz quiz);
}
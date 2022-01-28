package com.ssafy.db.repository;

import com.ssafy.db.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface QuizLogRepository extends JpaRepository<QuizLog, QuizLogId> {
    List<QuizLog> findByStudent(Student student);

}
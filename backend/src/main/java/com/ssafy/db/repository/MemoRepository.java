package com.ssafy.db.repository;

import com.ssafy.db.entity.Memo;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.Student;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoRepository extends JpaRepository<Memo, Long> {
    Memo findByStudentAndUser(Student student, User user);
    List<Memo> findMemoByStudent(Student student);
}
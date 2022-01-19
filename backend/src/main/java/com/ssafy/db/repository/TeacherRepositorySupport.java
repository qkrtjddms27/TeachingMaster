package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QTeacher;
import com.ssafy.db.entity.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class TeacherRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QTeacher qTeacher = QTeacher.teacher;

    public Optional<Teacher> findTeacherByTeacherId(String teacherId) {
        Teacher teacher = jpaQueryFactory.select(qTeacher).from(qTeacher)
                .where(qTeacher.teacherId.eq(teacherId)).fetchOne();
        if(teacher == null) return Optional.empty();
        return Optional.ofNullable(teacher);
    }
}

package com.ssafy.db.repository;

import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class QuizOptionRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QQuizOption qQuizOption = QQuizOption.quizOption;


    public void deleteOptionsByQuizId(Long quizId) {
        System.out.println(qQuizOption.quiz);
        jpaQueryFactory.delete(qQuizOption).where(qQuizOption.quiz.quizId.eq(quizId)).execute();
    }
}

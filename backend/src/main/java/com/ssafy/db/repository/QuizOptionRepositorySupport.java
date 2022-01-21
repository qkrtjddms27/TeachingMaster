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
    QQuiz qQuiz = QQuiz.quiz;


    public void deleteOptionsByQuiz(Long quizId) {
        System.out.println(qQuizOption.quiz.quizId.eq(qQuiz.quizId));
        jpaQueryFactory.delete(qQuizOption).where(qQuiz.quizId.eq(quizId)).execute();

//      jpaQueryFactory.delete(qQuizOption).where(qQuiz.quizId.eq(quizId)).execute();
    }
}

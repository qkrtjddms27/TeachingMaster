package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QQuiz;
import com.ssafy.db.entity.Quiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class QuizRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QQuiz qQuiz = QQuiz.quiz;

    public Optional<Quiz> findUserByQuizId(long quizId) {
        Quiz quiz = jpaQueryFactory.select(qQuiz).from(qQuiz)
                .where(qQuiz.quizId.eq(quizId)).fetchOne();
        if(quiz == null) return Optional.empty();
        return Optional.ofNullable(quiz);
    }
}

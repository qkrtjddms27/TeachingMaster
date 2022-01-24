package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Quiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class QuizRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QQuiz qQuiz = QQuiz.quiz;
    QBookmark qbookmark = QBookmark.bookmark;

    public Optional<Quiz> findUserByQuizId(long quizId) {
        Quiz quiz = jpaQueryFactory.select(qQuiz).from(qQuiz)
                .where(qQuiz.quizId.eq(quizId)).fetchOne();
        if(quiz == null) return Optional.empty();
        return Optional.ofNullable(quiz);
    }

    public List<Quiz> findAllWithBookMark(String userId) {
        List<Quiz> quizList = jpaQueryFactory.select(qQuiz).from(qQuiz)
                .leftJoin(qbookmark.quiz, qQuiz)
                .on(qbookmark.user.userId.eq(userId)).fetch();
        return quizList;
    }
}

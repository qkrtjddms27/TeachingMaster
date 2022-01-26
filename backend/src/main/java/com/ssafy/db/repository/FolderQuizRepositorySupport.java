package com.ssafy.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.api.response.QuizAllRes;
import com.ssafy.db.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FolderQuizRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QFolderQuiz qFolderQuiz  = QFolderQuiz.folderQuiz;
    QQuiz qQuiz = QQuiz.quiz;
    QFolder qFolder = QFolder.folder;

    public List<QuizAllRes> joinFolderQuiz(String userId) {


        List<QuizAllRes> quizAllResList = jpaQueryFactory
                .select(Projections.bean(QuizAllRes.class, qQuiz.quizId, qQuiz.subject, qQuiz.quizPhoto , qQuiz.quizTitle
                        ,qQuiz.quizContents, qQuiz.quizAnswer, qQuiz.openStatus, qQuiz.quizTimeout
                        ,qQuiz.quizGrade, qQuiz.user.userId, qQuiz.option1, qQuiz.option2, qQuiz.option3
                        ,qQuiz.option4
                        ,new CaseBuilder().when(qFolderQuiz.folder.folderId
                                .in(jpaQueryFactory.select(qFolder.folderId).from(qFolder)
                                        .where(qFolder.user.userId.eq(userId)) ))
                                .then(true).otherwise(false).as("folderCheck")))
                .from(qQuiz)
                .leftJoin(qFolderQuiz).on(qQuiz.quizId.eq(qFolderQuiz.quiz.quizId))
                .fetch();



        return quizAllResList;
    }

}

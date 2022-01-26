package com.ssafy.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.api.response.QuizAllRes;
import com.ssafy.db.entity.QBookmark;
import com.ssafy.db.entity.QFolder;
import com.ssafy.db.entity.QFolderQuiz;
import com.ssafy.db.entity.QQuiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class QuizRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QQuiz qQuiz = QQuiz.quiz;
    QFolderQuiz qFolderQuiz  = QFolderQuiz.folderQuiz;
    QFolder qFolder = QFolder.folder;
    QBookmark qBookmark = QBookmark.bookmark;

    public List<QuizAllRes> findAllFolderFavorQuiz(String userId) {

        List<QuizAllRes> quizAllResList = jpaQueryFactory
                .select(Projections.bean(QuizAllRes.class, qQuiz.quizId, qQuiz.subject, qQuiz.quizPhoto , qQuiz.quizTitle
                        ,qQuiz.quizContents, qQuiz.quizAnswer, qQuiz.openStatus, qQuiz.quizTimeout
                        ,qQuiz.quizGrade, qQuiz.user.userId, qQuiz.option1, qQuiz.option2, qQuiz.option3
                        ,qQuiz.option4
                        ,new CaseBuilder().when(qQuiz.quizId
                                        .in(jpaQueryFactory.select(qQuiz.quizId).from(qQuiz)
                                                .leftJoin(qFolderQuiz).on(qQuiz.quizId.eq(qFolderQuiz.quiz.quizId))
                                                .where(qFolderQuiz.folder.folderId
                                                        .in(jpaQueryFactory.select(qFolder.folderId).from(qFolder)
                                                                .where(qFolder.user.userId.eq(userId)))))).then(true).otherwise(false).as("folderCheck")
                        ,new CaseBuilder().when(qQuiz.quizId
                                .in(jpaQueryFactory.select(qBookmark.quiz.quizId).from(qBookmark)
                                                .where(qBookmark.user.userId.eq(userId)))).then(true).otherwise(false).as("bookMarkCheck")))

                .from(qQuiz).leftJoin(qBookmark).on(qBookmark.quiz.quizId.eq(qQuiz.quizId)).fetch();

        return quizAllResList;
    }

    public List<QuizAllRes> findFavorQuiz(String userId) {

        List<QuizAllRes> quizAllResList = jpaQueryFactory
                .select(Projections.bean(QuizAllRes.class, qQuiz.quizId, qQuiz.subject, qQuiz.quizPhoto , qQuiz.quizTitle
                        ,qQuiz.quizContents, qQuiz.quizAnswer, qQuiz.openStatus, qQuiz.quizTimeout
                        ,qQuiz.quizGrade, qQuiz.user.userId, qQuiz.option1, qQuiz.option2, qQuiz.option3
                        ,qQuiz.option4
                        ,new CaseBuilder().when(qQuiz.quizId
                                .in(jpaQueryFactory.select(qQuiz.quizId).from(qQuiz)
                                        .leftJoin(qFolderQuiz).on(qQuiz.quizId.eq(qFolderQuiz.quiz.quizId))
                                        .where(qFolderQuiz.folder.folderId
                                                .in(jpaQueryFactory.select(qFolder.folderId).from(qFolder)
                                                        .where(qFolder.user.userId.eq(userId)))))).then(true).otherwise(false).as("folderCheck")
                        ,new CaseBuilder().when(qQuiz.quizId
                                .in(jpaQueryFactory.select(qBookmark.quiz.quizId).from(qBookmark)
                                        .where(qBookmark.user.userId.eq(userId)))).then(true).otherwise(false).as("bookMarkCheck")))

                .from(qQuiz).leftJoin(qBookmark).on(qBookmark.quiz.quizId.eq(qQuiz.quizId))
                .where(qBookmark.user.userId.eq(userId)).fetch();

        return quizAllResList;
    }

    public List<QuizAllRes> findFolderQuiz(Long folderId, String userId) {

        List<QuizAllRes> quizAllResList = jpaQueryFactory
                .select(Projections.bean(QuizAllRes.class, qQuiz.quizId, qQuiz.subject, qQuiz.quizPhoto , qQuiz.quizTitle
                        ,qQuiz.quizContents, qQuiz.quizAnswer, qQuiz.openStatus, qQuiz.quizTimeout
                        ,qQuiz.quizGrade, qQuiz.user.userId, qQuiz.option1, qQuiz.option2, qQuiz.option3
                        ,qQuiz.option4

                        ,new CaseBuilder().when(qQuiz.quizId
                                .in(jpaQueryFactory.select(qBookmark.quiz.quizId).from(qBookmark)
                                        .where(qBookmark.user.userId.eq(userId)))).then(true).otherwise(false).as("bookMarkCheck")))

                .from(qQuiz).leftJoin(qBookmark).on(qBookmark.quiz.quizId.eq(qQuiz.quizId))
                .where(qQuiz.quizId
                        .in(jpaQueryFactory.select(qFolderQuiz.quiz.quizId).from(qFolderQuiz).where(qFolderQuiz.folder.folderId.eq(folderId)))).fetch();

        return quizAllResList;
    }
}
//Quiz를 BookMark, Folder에 있는지 없는지 체크해서 return
//    select q.*,
//        if(q.quiz_id in
//        (select q.quiz_id from quiz q left join folder_quiz fq on q.quiz_id = fq.quiz_id where fq.folder_id in
//        (select f.folder_id from folder f where f.user_id like "ssafy1")), true, false) as "folder_check",
//        if(b.user_id like "ssafy1", true, false)
//        from quiz q left join bookmark b on b.quiz_id = q.quiz_id;
package com.ssafy.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;
import java.util.Optional;

import com.ssafy.api.response.ConferenceRes;
import com.ssafy.db.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class UserRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;
    QQuiz qQuiz = QQuiz.quiz;
    QConference qConference = QConference.conference;
    QRoom qRoom = QRoom.room;

    public Optional<User> findUserByUserId(String userId) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userId.eq(userId)).fetchOne();
        if(user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }
    public List<Quiz> findQuizByUserId(String userId) {
        return jpaQueryFactory.select(qQuiz)
                .from(qQuiz).where(qUser.userId.eq(userId)).fetch();

    }

    //master true 여부로 관리자 찾기(한명이라는 가정)
    public Optional<User> findUserByMaster() {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.master.eq(true)).fetchOne();
        if(user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }

    public List<ConferenceRes> findUserByRoomAndIsActive(){
        List<ConferenceRes> conferenceResList = jpaQueryFactory
                .select((Projections.bean(ConferenceRes.class, qUser.userId,qUser.userProfile,qRoom.roomGrade,qRoom.roomNum)))
                .from(qUser).leftJoin(qRoom).on(qUser.room.eq(qRoom)).leftJoin(qConference).on(qConference.isActive.isTrue())
                .where(qUser.room.eq(qConference.room)).fetch();
        return conferenceResList;
    }
}

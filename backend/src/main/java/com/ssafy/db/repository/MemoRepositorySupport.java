package com.ssafy.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.api.response.ConferenceRes;
import com.ssafy.api.response.MemoRes;
import com.ssafy.db.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public class MemoRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;
    QMemo qMemo = QMemo.memo;

    public List<MemoRes> findMemoByStudentId(String studentId){
        List<MemoRes> memoResList = jpaQueryFactory
                .select((Projections.bean(MemoRes.class, qMemo.memoContent)))
                .from(qMemo).where(qMemo.student.studentId.eq(studentId)).fetch();
        return memoResList;
    }
}

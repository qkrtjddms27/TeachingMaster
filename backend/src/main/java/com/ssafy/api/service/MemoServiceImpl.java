package com.ssafy.api.service;


import com.ssafy.api.request.*;
import com.ssafy.api.response.MemoRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

@Service("MemoService")
public class MemoServiceImpl implements MemoService{

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    UserRepositorySupport userRepository;

    @Autowired
    MemoRepository memoRepository;

    @Autowired
    MemoRepositorySupport memoRepositorySupport;

    @Override
    public Memo createMemo(MemoRegisterReq memoRegisterReq) {
        Student findStudent = studentRepository.findByStudentId(memoRegisterReq.getStudentId());
        User findUser = userRepository.findUserByUserId(memoRegisterReq.getUserId()).orElse(null);
        Memo findMemo = memoRepository.findByStudentAndUser(findStudent,findUser);
        
        Calendar cal = new GregorianCalendar();
        Date date = new Date(cal.getTimeInMillis());

        if(findMemo != null){
            Memo memo = new Memo();
            memo.setMemoDate(date);
            memo.setUser(findUser);
            memo.setStudent(findStudent);
            memo.setMemoContent((findMemo.getMemoContent() + "\\n" + memoRegisterReq.getMemoContent()));

            return memoRepository.save(memo);
        }else{

        Memo memo = new Memo();
        memo.setMemoDate(date);
        memo.setMemoContent(memoRegisterReq.getMemoContent());
        memo.setStudent(findStudent);
        memo.setUser(findUser);


        return memoRepository.save(memo);
        }
    }

    @Override
    public List<MemoRes> searchMemo(String studentId){
        return memoRepositorySupport.findMemoByStudentId(studentId);
    }
}
package com.ssafy.api.service;

import com.ssafy.api.request.StudentInfoUpdateReq;
import com.ssafy.api.request.StudentRegisterPostReq;
import com.ssafy.api.request.StudentScoreUpReq;
import com.ssafy.db.entity.Student;

import java.util.List;

public interface StudentService {
    Student createStudent(StudentRegisterPostReq userRegisterInfo);
    Student getStudentByUserId(String studentId);
    void deleteStudent(String studentId);
    Student updateStudent(StudentInfoUpdateReq userUpdateInfo);
    List<Student> searchAll();
    Student plusStudentScore(StudentScoreUpReq studentScoreUpReq);
}

package com.ssafy.api.service;

import com.ssafy.api.request.TeacherRegisterPostReq;
import com.ssafy.db.entity.Teacher;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface TeacherService {
	Teacher createTeacher(TeacherRegisterPostReq teacherRegisterInfo);
	Teacher getTeacherByTeacherId(String teacherId);
}

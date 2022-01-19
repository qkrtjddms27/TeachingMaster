package com.ssafy.api.service;

import com.ssafy.api.request.TeacherRegisterPostReq;
import com.ssafy.db.entity.Teacher;
import com.ssafy.db.repository.TeacherRepository;
import com.ssafy.db.repository.TeacherRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("TeacherService")
public class TeacherServiceImpl implements TeacherService {
	@Autowired
	TeacherRepository teacherRepository;
	
	@Autowired
	TeacherRepositorySupport teacherRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public Teacher createTeacher(TeacherRegisterPostReq teacherRegisterInfo) {
		Teacher teacher = new Teacher();
		teacher.setTeacherName(teacherRegisterInfo.getTeacherName());
		teacher.setTeacherHomeroom(teacherRegisterInfo.getTeacherHomeroom());
		teacher.setTeacherProfile(teacherRegisterInfo.getTeacherProfile());
		teacher.setMaster(teacherRegisterInfo.getMaster());

		teacher.setTeacherId(teacherRegisterInfo.getTeacherId());

		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		teacher.setTeacherPassword(passwordEncoder.encode(teacherRegisterInfo.getTeacherPassword()));


		return teacherRepository.save(teacher);
	}

	@Override
	public Teacher getTeacherByTeacherId(String teacherId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		Teacher teacher = teacherRepositorySupport.findTeacherByTeacherId(teacherId).get();
		return teacher;
	}
}

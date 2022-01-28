package com.ssafy.api.service;

import com.ssafy.api.request.StudentInfoUpdateReq;
import com.ssafy.api.request.StudentRegisterPostReq;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.Student;
import com.ssafy.db.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("StudentService")
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    RoomService roomService;

    @Override
    public List<Student> searchAll() {
        return studentRepository.findAll();
    }

    @Override
    public Student createStudent(StudentRegisterPostReq studentRegisterInfo) {
        Student findStudent = studentRepository.findByStudentId(studentRegisterInfo.getStudentId());

        if(findStudent != null) { // 해당 ID로 만들어진 Student가 있으면 아래 로직을 하지 실행하지 않는다.
            return null;
        }

        Student student = new Student();

        student.setStudentId(studentRegisterInfo.getStudentId());
        student.setStudentName(studentRegisterInfo.getStudentName());
        student.setStudentEmail(studentRegisterInfo.getStudentEmail());
        student.setStudentPhone(studentRegisterInfo.getStudentPhone());
        student.setAddress(studentRegisterInfo.getAddress());
        student.setParentsName(studentRegisterInfo.getParentsName());
        student.setParentsPhone(studentRegisterInfo.getParentsPhone());
        student.setRelation(studentRegisterInfo.getRelation());
        student.setStudentProfile(studentRegisterInfo.getStudentProfile());

        Room room = roomService.getRoomByRoomGradeAndRoomNum(studentRegisterInfo.getRoomGrade(),
                studentRegisterInfo.getRoomNum());

        // Room 객체가 없으면 Room 객체가 없으면 생성해서 넣는다.
        if(room == null) {
            room = new Room();
            room.setRoomNum(studentRegisterInfo.getRoomNum());
            room.setRoomGrade(studentRegisterInfo.getRoomGrade());
            room = roomService.createRoom(room);
        }

        student.setRoom(room);

        return studentRepository.save(student);
    }

    @Override
    public Student getStudentByUserId(String studentId) {
        return studentRepository.findById(studentId).get();
    }

    @Override
    public void deleteStudent(String studentId) {
        Student deleteStudent = getStudentByUserId(studentId);
        studentRepository.delete(deleteStudent);
    }

    @Override
    public Student updateStudent(StudentInfoUpdateReq userUpdateInfo) {
        Student student = getStudentByUserId(userUpdateInfo.getStudentId());

        student.setStudentId(userUpdateInfo.getStudentId());
        student.setStudentName(userUpdateInfo.getStudentName());
        student.setStudentEmail(userUpdateInfo.getStudentEmail());
        student.setStudentPhone(userUpdateInfo.getStudentPhone());
        student.setAddress(userUpdateInfo.getAddress());
        student.setParentsName(userUpdateInfo.getParentsName());
        student.setParentsPhone(userUpdateInfo.getParentsPhone());
        student.setRelation(userUpdateInfo.getRelation());
        student.setStudentProfile(userUpdateInfo.getStudentProfile());

        return studentRepository.save(student);
    }


}

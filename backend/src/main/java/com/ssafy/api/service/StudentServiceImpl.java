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
    public Student createStudent(StudentRegisterPostReq body) {
        Student findStudent = studentRepository.findByStudentId(body.getStudentId());

        if(findStudent != null) { // 해당 ID로 만들어진 Student가 있으면 아래 로직을 하지 실행하지 않는다.
            return null;
        }

//        Room room = roomService.getRoomByRoomGradeAndRoomNum(body.getRoomGrade(),
//                body.getRoomNum());

        // Room 객체가 없으면 Room 객체가 없으면 생성해서 넣는다.
//        if(room == null) {
//            room = new Room();
//            room.setRoomNum(body.getRoomNum());
//            room.setRoomGrade(body.getRoomGrade());
//            room = roomService.createRoom(room);
//        }

//        Student student = new Student();
//
//        student.setStudentId(studentRegisterInfo.getStudentId());
//        student.setStudentName(studentRegisterInfo.getStudentName());
//        student.setStudentEmail(studentRegisterInfo.getStudentEmail());
//        student.setStudentPhone(studentRegisterInfo.getStudentPhone());
//        student.setAddress(studentRegisterInfo.getAddress());
//        student.setParentsName(studentRegisterInfo.getParentsName());
//        student.setParentsPhone(studentRegisterInfo.getParentsPhone());
//        student.setRelation(studentRegisterInfo.getRelation());
//        student.setStudentProfile(studentRegisterInfo.getStudentProfile());
//        student.setRoom(room);

        return studentRepository.save(body.toEntity(body));
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
    public Student updateStudent(StudentInfoUpdateReq body) {
        Student student = getStudentByUserId(body.getStudentId());

        student.setStudentId(body.getStudentId());
        student.setStudentName(body.getStudentName());
        student.setStudentEmail(body.getStudentEmail());
        student.setStudentPhone(body.getStudentPhone());
        student.setAddress(body.getAddress());
        student.setParentsName(body.getParentsName());
        student.setParentsPhone(body.getParentsPhone());
        student.setRelation(body.getRelation());
        student.setStudentProfile(body.getStudentProfile());

        return studentRepository.save(student);
    }


}

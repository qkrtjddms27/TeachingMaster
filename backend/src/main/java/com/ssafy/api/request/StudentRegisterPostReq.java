package com.ssafy.api.request;

import com.ssafy.api.service.RoomService;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.Student;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
@ApiModel("StudentRegisterPostRequest")
public class StudentRegisterPostReq {
    @Autowired
    RoomService roomService;

    @ApiModelProperty(name="학생 코드", example="A12312B")
    private String studentId;

    @ApiModelProperty(name="학생 이름", example="진현은")
    private String studentName;

    @ApiModelProperty(name="학생 전화번호", example="01066511111")
    private String studentPhone;

    @ApiModelProperty(name="학생 사진", example="asdkgn123kasdnkgn2knagikegadg")
    private String studentProfile;

    @ApiModelProperty(name="학생 이메일", example="pseseseps@naver.com")
    private String studentEmail;

    @ApiModelProperty(name="보호자이름", example="진진자라")
    private String parentsName;

    @ApiModelProperty(name="주소", example="부산광역시 북구 구포3동 9987-42번지")
    private String address;

    @ApiModelProperty(name="보호자 관계", example="부")
    private String relation;

    @ApiModelProperty(name="보호자연락처", example="01066512222")
    private String parentsPhone;

    @ApiModelProperty(name="학년", example="1")
    private int roomGrade;

    @ApiModelProperty(name="반", example="5")
    private int roomNum;

    public Student toEntity(StudentRegisterPostReq body){
        Room room = roomService.getRoomByRoomGradeAndRoomNum(body.getRoomGrade(),
                body.getRoomNum());

        // Room 객체가 없으면 Room 객체가 없으면 생성해서 넣는다.
        if(room == null) {
            room = new Room();
            room.setRoomNum(body.getRoomNum());
            room.setRoomGrade(body.getRoomGrade());
            room = roomService.createRoom(room);
        }

        return Student.builder()
                .studentId(body.getStudentId())
                .studentName(body.getStudentName())
                .studentEmail(body.getStudentPhone())
                .studentPhone(body.getStudentPhone())
                .address(body.getAddress())
                .parentsName(body.getParentsName())
                .parentsPhone(body.getParentsPhone())
                .relation(body.getRelation())
                .studentProfile(body.getStudentProfile())
                .room(room)
                .build();
    }
}

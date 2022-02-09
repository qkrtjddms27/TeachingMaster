package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Student;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 학생 정보 조회 API ([GET] /api/v1/student/detail)
 */
@Getter
@Setter
@ApiModel("StudentResponse")
public class StudentRes extends BaseResponseBody {
    @ApiModelProperty(name="학생 이름", example="진현은")
    private String studentName;

    @ApiModelProperty(name="학생 전화번호", example="01066511111")
    private String studentPhone;

//    @ApiModelProperty(name="학생 사진", example="asdkgn123kasdnkgn2knagikegadg")
//    private String studentProfile;

    @ApiModelProperty(name="상점", example="0")
    private int studentScore;

    @ApiModelProperty(name="학생 이메일", example="pseseseps@naver.com")
    private String studentEmail;

    @ApiModelProperty(name="하이라이팅 가중치", example="0")
    private int countingStar;

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

    public static StudentRes of(Student student, Integer statusCode, String message){
        StudentRes res = new StudentRes();
        res.setStudentName(student.getStudentName());
        res.setStudentPhone(student.getStudentPhone());
//        res.setStudentProfile(student.getStudentProfile());
        res.setStudentScore(student.getStudentScore());
        res.setStudentEmail(student.getStudentEmail());
        res.setCountingStar(student.getCountingStar());
        res.setParentsName(student.getParentsName());
        res.setParentsPhone(student.getParentsPhone());
        res.setAddress(student.getAddress());
        res.setRelation(student.getRelation());
        res.setRoomGrade(student.getRoom().getRoomGrade());
        res.setRoomNum(student.getRoom().getRoomNum());
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}

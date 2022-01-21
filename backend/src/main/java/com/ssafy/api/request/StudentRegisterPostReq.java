package com.ssafy.api.request;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("StudentRegisterPostRequest")
public class StudentRegisterPostReq {
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
}

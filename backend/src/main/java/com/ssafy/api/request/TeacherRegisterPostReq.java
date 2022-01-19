package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/teachers) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("TeacherRegisterPostRequest")
public class TeacherRegisterPostReq {
	@ApiModelProperty(name="Id", example="ssafy_web")
	String teacherId;

	@ApiModelProperty(name="Password", example="your_password")
	String teacherPassword;

	@ApiModelProperty(name="name", example="your_name")
	String teacherName;

	@ApiModelProperty(name="homeroom", example="your_homeroom")
	Boolean teacherHomeroom;

	@ApiModelProperty(name="profile", example="profile")
	String teacherProfile;

	@ApiModelProperty(name="master", example="master")
	Boolean master;

}

package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 수정 API ([PUT] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserUpdatePutRequest")
public class UserUpdateReq {
	@ApiModelProperty(name="유저 ID", example="ssafy_web")
	String userId;

	@ApiModelProperty(name="name", example="your_name")
	String userName;

	@ApiModelProperty(name="homeroom", example="your_homeroom")
	Boolean userHomeroom;

	@ApiModelProperty(name="profile", example="profile")
	String userProfile;

	@ApiModelProperty(name="master", example="master")
	Boolean master;

	@ApiModelProperty(name="유저 소속 학년", example = "1")
	int roomGrade;

	@ApiModelProperty(name="유저 소속 반", example = "2")
	int roomNum;

}

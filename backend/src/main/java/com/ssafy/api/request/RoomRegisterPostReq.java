package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class RoomRegisterPostReq {
	@ApiModelProperty(name="유저 소속 학년", example = "1")
	int roomGrade;

	@ApiModelProperty(name="유저 소속 반", example = "2")
	int roomNum;


}

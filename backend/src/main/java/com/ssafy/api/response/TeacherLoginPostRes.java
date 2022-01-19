package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("TeacherLoginPostResponse")
public class TeacherLoginPostRes extends BaseResponseBody{
	@ApiModelProperty(name="JWT 인증 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String accessToken;
	
	public static TeacherLoginPostRes of(Integer statusCode, String message, String accessToken) {
		TeacherLoginPostRes res = new TeacherLoginPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setAccessToken(accessToken);
		return res;
	}
}

package com.ssafy.api.response;

import com.ssafy.db.entity.Teacher;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("TeacherResponse")
public class TeacherRes {
	@ApiModelProperty(name="User ID")
	String teacherId;
	
	public static TeacherRes of(Teacher teacher) {
		TeacherRes res = new TeacherRes();
		res.setTeacherId(teacher.getTeacherId());
		return res;
	}
}

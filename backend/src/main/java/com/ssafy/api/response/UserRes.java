package com.ssafy.api.response;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	@ApiModelProperty(name="User ID")
	String userId;
	@ApiModelProperty(name="Master")
	Boolean master;
	@ApiModelProperty(name="User Name")
	String userName;
	@ApiModelProperty(name="User Homeroom")
	Boolean userHomeroom;
	@ApiModelProperty(name="User profile")
	String userProfile;

	@ApiModelProperty(name="User Grade")
	int roomGrade;
	@ApiModelProperty(name="User num")
	int roomNum;

	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserId(user.getUserId());
		res.setMaster(user.getMaster());
		res.setUserName(user.getUserName());
		res.setUserHomeroom(user.getUserHomeroom());
		res.setUserProfile(user.getUserProfile());
		res.setRoomGrade(user.getRoom().getRoomGrade());
		res.setRoomNum(user.getRoom().getRoomNum());
		return res;
	}
}

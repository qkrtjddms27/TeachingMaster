package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Memo;
import com.ssafy.db.entity.Student;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * 강의실 정보 조회 API
 */
@Getter
@Setter
@ApiModel("ConferenceResponse")
public class ConferenceRes{
    @ApiModelProperty(name="선생님 id")
    private String userId;

    @ApiModelProperty(name="프로필")
    private String userProfile;

    @ApiModelProperty(name="학년")
    private int roomGrade;

    @ApiModelProperty(name="반")
    private int roomNum;



    public static List<ConferenceRes> of(List<ConferenceRes> user){
        List<ConferenceRes> res = user;

        return res;
    }
}

package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterRes extends BaseResponseBody {

    @ApiModelProperty(name="선생님 기본 프로필", example="https://cdn.discordapp.com/attachments/935373121698033714/940640585306484806/003d19efdc4e0679.png")
    private String userProfile;

    public static UserRegisterRes of(String userProfile, int statusCode, String message){
        UserRegisterRes userRegisterRes = new UserRegisterRes();
        userRegisterRes.setUserProfile(userProfile);
        userRegisterRes.setMessage(message);
        userRegisterRes.setStatusCode(statusCode);
        return userRegisterRes;
    }
}

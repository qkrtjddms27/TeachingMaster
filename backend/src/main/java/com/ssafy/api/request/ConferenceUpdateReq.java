package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ConferenceUpdateRequest")
public class ConferenceUpdateReq {
    @ApiModelProperty(name="선생님 아이디", example="ssafy_web")
    private String userId;

    @ApiModelProperty(name = "강의실 개설 여부", example="0")
    private int buttonValue;
}

package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RoomInfoRegisterRequest")
public class RoomInfoRegisterPostReq {
    @ApiModelProperty(name="학년", example="1")
    private int roomGrade;

    @ApiModelProperty(name="반", example="5")
    private int roomNum;
}

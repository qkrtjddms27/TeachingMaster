package com.ssafy.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoomRegisterPostReq {
    @ApiModelProperty(name="학년", example="1")
    private int roomGrade;

    @ApiModelProperty(name="반", example="5")
    private int roomNum;
}

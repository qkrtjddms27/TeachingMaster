package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("FavorRegisterRequest")
public class FavorRegisterReq {
    @ApiModelProperty(name="문제 번호")
    long quizId;
    @ApiModelProperty(name="선생님 id")
    String userId;

}

package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("MemoRegisterRequest")
public class MemoRegisterReq {
    @ApiModelProperty(name="학생 코드", example="A12340987")
    private String studentId;

    @ApiModelProperty(name="학생 메모", example = "수업에 열심히 참여함")
    private String memoContent;

    @ApiModelProperty(name="선생님 id", example = "ssafy_web")
    private String userId;


}

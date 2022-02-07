package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("QuizLogRequest")
public class QuizLogReq {
    @ApiModelProperty(name="학번")
    String studentId;

    @ApiModelProperty(name="퀴즈 번호")
    Long quizId;

    @ApiModelProperty(name="정답유무")
    Boolean quizResult;

    @ApiModelProperty(name="선택한 답")
    int selectAnswer;
}

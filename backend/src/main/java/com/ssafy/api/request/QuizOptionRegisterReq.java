package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("QuizRegisterRequest")
public class QuizOption {
    @ApiModelProperty(name="보기 index")
    int optionIndex;
    @ApiModelProperty(name="보기 번호")
    int optionId;
    @ApiModelProperty(name="보기 내용")
    String optionContent;
    @ApiModelProperty(name="퀴즈 id")
    long quizId;

}

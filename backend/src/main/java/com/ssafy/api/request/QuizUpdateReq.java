package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("QuizUpdatesRequest")
public class QuizUpdateReq {
    @ApiModelProperty(name="문제 번호")
    long quizId;
    @ApiModelProperty(name="과목 이름", example="국어,영어,수학,사회,과학,기타")
    String subject;
    @ApiModelProperty(name="사진 url")
    String quizPhoto;
    @ApiModelProperty(name="퀴즈 제목")
    String quizTitle;
    @ApiModelProperty(name="퀴즈 내용")
    String quizContents;
    @ApiModelProperty(name="정답")
    int quizAnswer;
    @ApiModelProperty(name="공개여부", example="false")
    Boolean openStatus;
    @ApiModelProperty(name="제한시간", example="30")
    int quizTimeout;
    @ApiModelProperty(name="학년", example="1,2,3,4,5,6")
    int quizGrade;
    @ApiModelProperty(name="선생님 id")
    String userId;

    @ApiModelProperty(name="보기")
    String options[];

}

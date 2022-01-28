package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("TestResponse")
public class QuizTestRes {
	@ApiModelProperty(name="문제 번호")
	Long quizId;

	@ApiModelProperty(name="퀴즈 제목")
	String quizTitle;

	@ApiModelProperty(name="폴더 번호")
	Long folderId;

}

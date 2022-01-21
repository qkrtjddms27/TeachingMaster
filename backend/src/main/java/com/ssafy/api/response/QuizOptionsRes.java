package com.ssafy.api.response;

import com.ssafy.api.request.QuizOptionRegisterReq;
import com.ssafy.db.entity.Folder;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.QuizOption;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("QuizOptionsResponse")
public class QuizOptionsRes {
	@ApiModelProperty(name="보기 index")
	long optionIndex;
	@ApiModelProperty(name="보기 번호")
	long optionId;
	@ApiModelProperty(name="보기 내용")
	String optionContent;
	@ApiModelProperty(name="퀴즈 id")
	long quizId;
	
	public static List<QuizOptionsRes> of(List<QuizOption> options) {
		List<QuizOptionsRes> res = new ArrayList<>();

		for (QuizOption option:options) {
			QuizOptionsRes quizOptionsRes = new QuizOptionsRes();
			quizOptionsRes.setOptionIndex(option.getOptionIndex());
			quizOptionsRes.setOptionId(option.getOptionId());
			quizOptionsRes.setOptionContent(option.getOptionContent());

			quizOptionsRes.setQuizId(option.getQuiz().getQuizId());

			res.add(quizOptionsRes);
		}

		return res;
	}
}

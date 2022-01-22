package com.ssafy.api.response;

import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.QuizOption;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("QuizResponse")
public class QuizRes {
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

	@ApiModelProperty(name="보기 List")
	List<QuizOptionsRes> quizOptions;

	public static QuizRes of(Quiz quiz) {
		QuizRes res = new QuizRes();
		res.setQuizId(quiz.getQuizId());
		res.setSubject(quiz.getSubject());
		res.setQuizPhoto(quiz.getQuizPhoto());
		res.setQuizTitle(quiz.getQuizTitle());
		res.setQuizContents(quiz.getQuizContents());
		res.setQuizAnswer(quiz.getQuizAnswer());
		res.setOpenStatus(quiz.getOpenStatus());
		res.setQuizTimeout(quiz.getQuizTimeout());
		res.setQuizGrade(quiz.getQuizGrade());

		res.setUserId(quiz.getUser().getUserId());

		return res;
	}

	public static List<QuizRes> of(List<Quiz> quizList) {

		List<QuizRes> resList = new ArrayList<>();

		for (Quiz quiz : quizList) {
			QuizRes res = new QuizRes();
			res.setQuizId(quiz.getQuizId());
			res.setSubject(quiz.getSubject());
			res.setQuizPhoto(quiz.getQuizPhoto());
			res.setQuizTitle(quiz.getQuizTitle());
			res.setQuizContents(quiz.getQuizContents());
			res.setQuizAnswer(quiz.getQuizAnswer());
			res.setOpenStatus(quiz.getOpenStatus());
			res.setQuizTimeout(quiz.getQuizTimeout());
			res.setQuizGrade(quiz.getQuizGrade());
			res.setUserId(quiz.getUser().getUserId());

			resList.add(res);
		}

		return resList;
	}

	public static QuizRes of(Quiz quiz, List<QuizOption> quizOptions) {

		QuizRes res = new QuizRes();

		res.setQuizId(quiz.getQuizId());
		res.setSubject(quiz.getSubject());
		res.setQuizPhoto(quiz.getQuizPhoto());
		res.setQuizTitle(quiz.getQuizTitle());
		res.setQuizContents(quiz.getQuizContents());
		res.setQuizAnswer(quiz.getQuizAnswer());
		res.setOpenStatus(quiz.getOpenStatus());
		res.setQuizTimeout(quiz.getQuizTimeout());
		res.setQuizGrade(quiz.getQuizGrade());

		res.setUserId(quiz.getUser().getUserId());

		List<QuizOptionsRes> quizOptionsResList = new ArrayList<>();

		for (QuizOption quizOption : quizOptions) {
			QuizOptionsRes quizOptionsRes = new QuizOptionsRes();

			quizOptionsRes.setQuizId(quizOption.getOptionId());
			quizOptionsRes.setOptionIndex(quizOption.getOptionIndex());
			quizOptionsRes.setOptionId(quizOption.getOptionId());
			quizOptionsRes.setOptionContent(quizOption.getOptionContent());

			quizOptionsResList.add(quizOptionsRes);
		}
		res.setQuizOptions(quizOptionsResList);

		return res;
	}
}

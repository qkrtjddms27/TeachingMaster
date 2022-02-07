package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.QuizLog;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ApiModel("QuizLogResponse")
public class QuizLogRes {

	@ApiModelProperty(name="학번")
	String studentId;
	@ApiModelProperty(name="퀴즈 번호")
	Long quizId;
	@ApiModelProperty(name="정답유무")
	Boolean quizResult;
	@ApiModelProperty(name="출제날짜")
	Date quizDate;
	@ApiModelProperty(name="선택한 답")
	int selectAnswer;

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

	@JsonIgnore
	String option1;
	@JsonIgnore
	String option2;
	@JsonIgnore
	String option3;
	@JsonIgnore
	String option4;

	public static QuizLogRes of(QuizLog quizlog) {

			QuizLogRes res = new QuizLogRes();
			res.setQuizId(quizlog.getQuiz().getQuizId());
			res.setStudentId(quizlog.getStudent().getStudentId());
			res.setQuizResult(quizlog.getQuizResult());
			res.setSelectAnswer(quizlog.getSelectAnswer());

		return res;
	}

	public static List<QuizLogRes> of(List<QuizLogRes> quizList) {

		List<QuizLogRes> resList = new ArrayList<>();

		for (QuizLogRes quizLog : quizList) {
			QuizLogRes res = new QuizLogRes();

			res.setQuizId(quizLog.getQuizId());
			res.setStudentId(quizLog.getStudentId());
			res.setQuizResult(quizLog.getQuizResult());
			res.setSelectAnswer(quizLog.getSelectAnswer());
			res.setQuizDate(quizLog.getQuizDate());

			res.setSubject(quizLog.getSubject());
			res.setQuizPhoto(quizLog.getQuizPhoto());
			res.setQuizTitle(quizLog.getQuizTitle());
			res.setQuizContents(quizLog.getQuizContents());
			res.setQuizAnswer(quizLog.getQuizAnswer());
			res.setOpenStatus(quizLog.getOpenStatus());
			res.setQuizTimeout(quizLog.getQuizTimeout());
			res.setQuizGrade(quizLog.getQuizGrade());
			res.setUserId(quizLog.getUserId());

			String[] options = new String[4];
			options[0] = quizLog.getOption1();
			options[1] = quizLog.getOption2();
			options[2] = quizLog.getOption3();
			options[3] = quizLog.getOption4();

			resList.add(res);
		}

		return resList;
	}

}

package com.ssafy.api.response;

import com.ssafy.db.entity.Folder;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("QuizResponse")
public class QuizRes {
	@ApiModelProperty(name="문제 번호")
	long id;
	@ApiModelProperty(name="과목 이름", example="국어,영어,수학,사회,과학,기타")
	String subject;
	@ApiModelProperty(name="사진 url")
	String photo;
	@ApiModelProperty(name="퀴즈 제목")
	String title;
	@ApiModelProperty(name="퀴즈 내용")
	String contents;
	@ApiModelProperty(name="정답")
	int answer;
	@ApiModelProperty(name="공개여부", example="false")
	Boolean status;
	@ApiModelProperty(name="제한시간", example="30")
	int timeout;
	@ApiModelProperty(name="학년", example="1,2,3,4,5,6")
	int grade;
	@ApiModelProperty(name="선생님 id")
	String userId;
	@ApiModelProperty(name="폴더 index")
	int folderIndex;
	
	public static QuizRes of(Quiz quiz) {
		QuizRes res = new QuizRes();
		res.setId(quiz.getQuizId());
		res.setSubject(quiz.getSubject());
		res.setPhoto(quiz.getQuizPhoto());
		res.setTitle(quiz.getQuizTitle());
		res.setContents(quiz.getQuizContents());
		res.setAnswer(quiz.getQuizAnswer());
		res.setStatus(quiz.getOpenStatus());
		res.setTimeout(quiz.getQuizTimeout());
		res.setGrade(quiz.getQuizGrade());

		User user = quiz.getUser();
		res.setUserId(user.getUserId());

		Folder folder = quiz.getFolder();
		res.setFolderIndex(folder.getFolderId();

		return res;
	}
}

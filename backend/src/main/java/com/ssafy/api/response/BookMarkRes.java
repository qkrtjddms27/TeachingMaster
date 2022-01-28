package com.ssafy.api.response;

import com.ssafy.db.entity.Bookmark;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("BookMarkResponse")
public class BookMarkRes {
	@ApiModelProperty(name="퀴즈 id")
	long quizId;
	@ApiModelProperty(name="선생님 Id")
	String userId;

	public static BookMarkRes of(Bookmark bookmark) {
		BookMarkRes res = new BookMarkRes();

		res.setQuizId(bookmark.getQuiz().getQuizId());
		res.setUserId(bookmark.getUser().getUserId());

		return res;
	}
}

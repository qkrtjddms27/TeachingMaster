package com.ssafy.api.response;

import com.ssafy.db.entity.Folder;
import com.ssafy.db.entity.FolderQuiz;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("FolderQuizResponse")
public class FolderQuizRes {
	@ApiModelProperty(name=" index")
	Long folderQuizId;
	@ApiModelProperty(name="폴더 Id")
	Long folderId;
	@ApiModelProperty(name="퀴즈 이름")
	Long quizId;


	public static FolderQuizRes of(FolderQuiz folderQuiz) {
		FolderQuizRes res = new FolderQuizRes();

		res.setFolderQuizId(folderQuiz.getFolderQuizId());
		res.setFolderId(folderQuiz.getFolder().getFolderId());
		res.setQuizId(folderQuiz.getQuiz().getQuizId());

		return res;
	}
}

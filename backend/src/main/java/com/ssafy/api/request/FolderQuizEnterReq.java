package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("FolderQuizRegisterRequest")
public class FolderQuizEnterReq {
    @ApiModelProperty(name="폴더 id")
    long folderId;
    @ApiModelProperty(name="퀴즈 번호")
    long quizId;

}

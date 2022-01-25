package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("FolderRegisterRequest")
public class FolderRegisterReq {
    @ApiModelProperty(name="폴더 이름")
    String folderName;
    @ApiModelProperty(name="선생님 id")
    String userId;

}

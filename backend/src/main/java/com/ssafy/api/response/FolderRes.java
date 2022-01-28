package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import com.ssafy.db.entity.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("FolderResponse")
public class FolderRes {
	@ApiModelProperty(name="폴더 index")
	long folderId;
	@ApiModelProperty(name="선생님 Id")
	String userId;
	@ApiModelProperty(name="폴더 이름")
	String folderName;

	public static List<FolderRes> of(List<Folder> folders) {
		List<FolderRes> res = new ArrayList<>();

		for (Folder folder:folders) {
			FolderRes folderRes = new FolderRes();

			folderRes.setFolderId(folder.getFolderId());
			folderRes.setUserId(folder.getUser().getUserId());
			folderRes.setFolderName(folder.getFolderName());

			res.add(folderRes);
		}

		return res;
	}

	public static FolderRes of(Folder folder) {
		FolderRes res = new FolderRes();

		res.setFolderId(folder.getFolderId());
		res.setUserId(folder.getUser().getUserId());
		res.setFolderName(folder.getFolderName());


		return res;
	}
}

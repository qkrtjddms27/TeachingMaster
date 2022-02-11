package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Memo;
import com.ssafy.db.entity.Student;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

/**
 * 메모 정보 조회 API
 */
@Getter
@Setter
@ApiModel("MemoResponse")
public class MemoRes extends BaseResponseBody {
    @ApiModelProperty(name="학생 Id", example="A12340987")
    private String studentId;

    @ApiModelProperty(name="선생님 Id", example="ssafy_web")
    private String userId;

    @ApiModelProperty(name="내용", example="굿")
    private String memoContent;

    public static MemoRes of(Memo memo, Integer statusCode, String message){
        MemoRes res = new MemoRes();
        res.setStudentId(memo.getStudent().getStudentId());
        res.setUserId(memo.getUser().getUserId());
        res.setMemoContent(memo.getMemoContent());
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}

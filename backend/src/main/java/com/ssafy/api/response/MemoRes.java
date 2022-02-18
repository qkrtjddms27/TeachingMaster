package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Memo;
import com.ssafy.db.entity.Student;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

/**
 * 메모 정보 조회 API
 */
@Getter
@Setter
@ApiModel("MemoResponse")
public class MemoRes{
    @ApiModelProperty(name="내용", example="굿")
    private String memoContent;

    public static List<MemoRes> of(List<MemoRes> memo){
        List<MemoRes> res = memo;
        return res;
    }
}

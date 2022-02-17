package com.ssafy.api.service;

import com.ssafy.api.request.*;
import com.ssafy.api.response.MemoRes;
import com.ssafy.db.entity.Memo;

import java.util.List;

public interface MemoService {
    Memo createMemo(MemoRegisterReq memoRegisterReq);
    List<MemoRes> searchMemo(String studentId);

}

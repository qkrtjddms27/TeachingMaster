package com.ssafy.api.controller;

import com.ssafy.api.request.MemoRegisterReq;
import com.ssafy.api.request.StudentScoreUpReq;
import com.ssafy.api.response.ConferenceRes;
import com.ssafy.api.response.MemoRes;
import com.ssafy.api.service.MemoService;
import com.ssafy.api.service.StudentService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Memo;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "메모", tags = {"Memo"})
@RestController
@RequestMapping("/api/memo")
public class MemoController {

    @Autowired
    MemoService memoService;


    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("")
    @ApiOperation(value = "학생 메모 저장", notes = "학생 메모를 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register_memo(
            @RequestBody @ApiParam(value = "메모 등록 정보", required = true) MemoRegisterReq memoRegisterReq) {


        memoService.createMemo(memoRegisterReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/{student_id}")
    @ApiOperation(value = "학생 메모 조회", notes = "학생 메모를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<MemoRes>> search_memo(
            @PathVariable("student_id") String studentId) {

        List<MemoRes> memo = memoService.searchMemo(studentId);

        return ResponseEntity.status(200).body(MemoRes.of(memo));

    }

}

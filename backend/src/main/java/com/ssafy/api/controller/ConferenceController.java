package com.ssafy.api.controller;

import com.ssafy.api.request.ConferenceUpdateReq;
import com.ssafy.api.response.ConferenceRes;
import com.ssafy.api.service.ConferenceService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "강의실 API", tags = {"Conference"})
@RestController
@RequestMapping("/api/conference")
public class ConferenceController {

    @Autowired
    ConferenceService conferenceService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PutMapping("")
    @ApiOperation(value = "강의실 정보 수정", notes = "강의실 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })public ResponseEntity<? extends BaseResponseBody> update(@RequestBody @ApiParam(value="강의실 정보", required = true) ConferenceUpdateReq updateInfo){

        conferenceService.updateConf(updateInfo);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/check")
    @ApiOperation(value = "수업 중 강의실 조회", notes = "수업 중인 강의실 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ConferenceRes>> search() {

        List<ConferenceRes> user = conferenceService.searchConf();

        return ResponseEntity.status(200).body(ConferenceRes.of(user));

    }
}

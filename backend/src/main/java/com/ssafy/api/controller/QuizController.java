package com.ssafy.api.controller;

import com.ssafy.api.request.QuizOptionRegisterReq;
import com.ssafy.api.request.QuizRegisterReq;
import com.ssafy.api.response.QuizOptionsRes;
import com.ssafy.api.response.QuizRes;
import com.ssafy.api.service.QuizService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.QuizOption;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "Quiz API", tags = {"Quiz"})
@RestController
@RequestMapping("/api/v1/quiz")
public class QuizController {

    @Autowired
    QuizService quizService;

    @PostMapping("/create/main")
    @ApiOperation(value = "quiz 등록", notes = "과목, 사진(필요시), 퀴즈제목, 내용, 정답, 공개여부,제한시간, 학년, 선생님ID, 폴더 ID로 퀴즈 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<QuizRes> register_quiz(
            @RequestBody @ApiParam(value="퀴즈 등록 정보", required = true) QuizRegisterReq quizInfo) {

        Quiz quiz =  quizService.createQuiz(quizInfo);
        return ResponseEntity.status(200).body(QuizRes.of(quiz));
    }


    @PostMapping("/create/option")
    @ApiOperation(value = "quiz option등록", notes = "항목들을 퀴즈의 보기들로 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<QuizOptionsRes>> register_option(
            @RequestBody @ApiParam(value="퀴즈 옵션 정보", required = true) List<QuizOptionRegisterReq> list) {

        List<QuizOption> quizOptions = quizService.createOption(list);

        return ResponseEntity.status(200).body(QuizOptionsRes.of(quizOptions));
    }

    @PutMapping("/update/quiz")
    @ApiOperation(value = "quiz 수정", notes = "퀴즈 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<QuizRes> update_quiz(
            @RequestBody @ApiParam(value = "퀴즈 정보 수정", required = true) QuizRegisterReq quizInfo
    ){
        Quiz quiz = quizService.updateQuiz(quizInfo);

        return ResponseEntity.status(200).body(QuizRes.of(quiz));
    }

    @PutMapping("/update/option")
    @ApiOperation(value = "quiz option 수정", notes = "퀴즈 옵션 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<QuizOptionsRes>> update_quizOption(
            @RequestBody @ApiParam(value = "퀴즈 옵션 정보 수정", required = true) List<QuizOptionRegisterReq> optionInfos
    ){
        List<QuizOption> lists = quizService.updateOption(optionInfos);

        return ResponseEntity.status(200).body(QuizOptionsRes.of(lists));
    }

    @DeleteMapping("delete/{quiz_id}")
    @ApiOperation(value = "quiz, options 삭제", notes = "퀴즈 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> delete_Quiz(@PathVariable("quiz_id") Long quizId){

        quizService.deleteQuiz(quizId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

}
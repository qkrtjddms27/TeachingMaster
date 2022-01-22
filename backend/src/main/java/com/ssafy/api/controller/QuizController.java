package com.ssafy.api.controller;

import com.ssafy.api.request.QuizRegisterReq;
import com.ssafy.api.response.FolderRes;
import com.ssafy.api.response.QuizRes;
import com.ssafy.api.service.QuizService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Folder;
import com.ssafy.db.entity.Quiz;
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

    @PostMapping("/create/{folder_id}")
    @ApiOperation(value = "quiz 등록", notes = "과목, 사진(필요시), 퀴즈제목, 내용, 정답, 공개여부,제한시간, 학년, 선생님ID, 폴더 ID로 퀴즈 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<QuizRes> register_quiz(
            @RequestBody @ApiParam(value="퀴즈 등록 정보", required = true) QuizRegisterReq quizInfo,
            @PathVariable("folder_id") Long folderId) {

        Quiz quiz =  quizService.createQuiz(quizInfo, folderId);
        return ResponseEntity.status(200).body(QuizRes.of(quiz));
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
        System.out.println("quizController 들어옴");
        Quiz quiz = quizService.updateQuiz(quizInfo);

        return ResponseEntity.status(200).body(QuizRes.of(quiz));
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

    @GetMapping("/folder/{user_id}")
    @ApiOperation(value = "선생님 폴더 목록 불러오기", notes = "폴더 목록 Select")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<FolderRes>> select_folder(@PathVariable("user_id") String userId){
        List<Folder> list = quizService.selectFolders(userId);

        return ResponseEntity.status(200).body(FolderRes.of(list));
    }

    @GetMapping("/find/folderQuiz/{folder_id}")
    @ApiOperation(value = "해당 폴더의 퀴즈 목록 불러오기", notes = "퀴즈리스트 Select")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<QuizRes>> select_folderQuiz(@PathVariable("folder_id") Long folderId){
        List<Quiz> quizList = quizService.selectsFolderQuiz(folderId);

        return ResponseEntity.status(200).body(QuizRes.of(quizList));
    }

    @GetMapping("/find/Quiz/{quiz_id}")
    @ApiOperation(value = "퀴즈 내용 불러오기", notes = "퀴즈 Select")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<QuizRes> select_folder(@PathVariable("quiz_id") Long quizId){
        QuizRes quizRes = quizService.selectQuiz(quizId);

        return ResponseEntity.status(200).body(quizRes);
    }

}
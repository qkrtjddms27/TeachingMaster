package com.ssafy.api.controller;

import com.ssafy.api.request.*;
import com.ssafy.api.response.*;
import com.ssafy.api.service.QuizService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Bookmark;
import com.ssafy.db.entity.Folder;
import com.ssafy.db.entity.FolderQuiz;
import com.ssafy.db.entity.Quiz;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "Quiz API", tags = {"Quiz"})
@RestController
@RequestMapping("/api/v1/quiz")
public class QuizController {

    @Autowired
    QuizService quizService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("/create")
    @ApiOperation(value = "quiz 등록", notes = "과목, 사진(필요시), 퀴즈제목, 내용, 정답, 공개여부,제한시간, 학년, 선생님ID, 폴더 ID로 퀴즈 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<QuizRes> register_quiz(
            @RequestBody @ApiParam(value = "퀴즈 등록 정보", required = true) QuizRegisterReq quizInfo) {
        Quiz quiz = quizService.createQuiz(quizInfo);
        return ResponseEntity.status(200).body(QuizRes.of(quiz));
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PutMapping("/update/quiz")
    @ApiOperation(value = "quiz 수정", notes = "퀴즈 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<QuizRes> update_quiz(
            @RequestBody @ApiParam(value = "퀴즈 정보 수정", required = true) QuizUpdateReq quizInfo
    ) {
        System.out.println("quizController 들어옴");
        Quiz quiz = quizService.updateQuiz(quizInfo);

        return ResponseEntity.status(200).body(QuizRes.of(quiz));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("delete/{quiz_id}")
    @ApiOperation(value = "quiz, options 삭제", notes = "퀴즈 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> delete_Quiz(@PathVariable("quiz_id") Long quizId) {

        quizService.deleteQuiz(quizId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/folder/{user_id}")
    @ApiOperation(value = "선생님 폴더 목록 불러오기", notes = "폴더 목록 Select")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<FolderRes>> select_folder(@PathVariable("user_id") String userId) {
        List<Folder> list = quizService.selectFolders(userId);

        return ResponseEntity.status(200).body(FolderRes.of(list));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/find/folderQuiz/{folder_id}")
    @ApiOperation(value = "해당 폴더의 퀴즈 목록 불러오기", notes = "퀴즈리스트 Select")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<QuizAllRes>> select_folderQuiz(
            @PathVariable("folder_id") Long folderId
    ) {
        List<QuizAllRes> quizList = quizService.selectsFolderQuiz(folderId);

        return ResponseEntity.status(200).body(quizList);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/find/Quiz/{quiz_id}")
    @ApiOperation(value = "퀴즈 내용 불러오기", notes = "퀴즈 Select")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<QuizRes> select_folder(@PathVariable("quiz_id") Long quizId) {
        QuizRes quizRes = quizService.selectQuiz(quizId);

        return ResponseEntity.status(200).body(quizRes);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/findAll/{user_id}")
    @ApiOperation(value = "전체 퀴즈 불러오기", notes = "퀴즈 Select")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<QuizAllRes>> select_quizAll(@PathVariable("user_id") String userId) {
        return ResponseEntity.status(200).body(quizService.selectQuizAll(userId));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("/create/folder")
    @ApiOperation(value = "폴더 생성", notes = "폴더 create")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<FolderRes> create_folder(
            @RequestBody FolderRegisterReq folderRegisterReq
            ) {
        Folder folder = quizService.createFolder(folderRegisterReq);

        return ResponseEntity.status(200).body(FolderRes.of(folder));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("/create/favor")
    @ApiOperation(value = "즐겨찾기 등록", notes = "즐겨찾기 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BookMarkRes> create_favor(
            @RequestBody FavorRegisterReq favorRegisterReq
            ) {

        Bookmark bookmark = quizService.createFavor(favorRegisterReq);

        return ResponseEntity.status(200).body(BookMarkRes.of(bookmark));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/select/favor/{user_id}")
    @ApiOperation(value = "즐겨찾기 보기", notes = "즐겨찾기 보기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<QuizAllRes>> select_favor(
            @PathVariable("user_id") String userId
    ) {
        List<QuizAllRes> quizList = quizService.selectFavor(userId);

        return ResponseEntity.status(200).body(quizList);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("/update/folder_mapping")
    @ApiOperation(value = "폴더에 퀴즈 넣기", notes = "폴더에 퀴즈 넣기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<FolderQuizRes> update_folder_quiz_mapping(
            @RequestBody FolderQuizEnterReq folderQuizEnterReq
            ) {

        FolderQuiz folderQuiz = quizService.insertQuiz(folderQuizEnterReq);

        return ResponseEntity.status(200).body(FolderQuizRes.of(folderQuiz));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/select/quiz_log/{student_id}")
    @ApiOperation(value = "학생 퀴즈 로그보기", notes = "학생 퀴즈 로그보기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<QuizLogRes>> select_quizLog(
            @PathVariable("student_id") String studentId
            ) {
        List<QuizLogRes> quizLogResList = quizService.selectQuizLog(studentId);

        return ResponseEntity.status(200).body(quizLogResList);
    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/delete/folder_quiz/{folder_id}/{quiz_id}")
    @ApiOperation(value = "폴더에서 퀴즈제거", notes = "폴더에서 퀴즈제거")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> delete_folderQuiz(
            @PathVariable("folder_id") Long folderId,
            @PathVariable("quiz_id") Long quizId
    ) {
        quizService.deleteFolderQuiz(folderId, quizId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/delete/bookmark/{user_id}/{quiz_id}")
    @ApiOperation(value = "즐겨찾기 제거", notes = "즐겨찾기 제거")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> delete_bookmark(
            @PathVariable("user_id") String user_id,
            @PathVariable("quiz_id") Long quizId
    ) {
        quizService.deleteBookmark(user_id, quizId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/delete/folder/{folder_id}")
    @ApiOperation(value = "폴더 삭제", notes = "폴더 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> delete_folder(
            @PathVariable("folder_id") Long folderId
    ) {
        quizService.deleteFolder(folderId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
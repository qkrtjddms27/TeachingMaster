package com.ssafy.api.service;

import com.ssafy.api.request.QuizRegisterReq;
import com.ssafy.api.response.QuizLogRes;
import com.ssafy.api.response.QuizRes;
import com.ssafy.db.entity.*;

import java.util.List;

public interface QuizService {
    Quiz createQuiz(QuizRegisterReq quizRegisterReq, Long folderId);
    Quiz updateQuiz(QuizRegisterReq quizRegisterReq);
    QuizRes selectQuiz(Long quizId);

    void deleteQuiz(Long quizId);

    List<Folder> selectFolders(String userId);
    List<Quiz> selectsFolderQuiz(Long folderId);

    List<Quiz> selectQuizAll();

    Folder createFolder(String userId, String folderName);
    Bookmark createFavor(String userId, Long quizId);

    List<Quiz> selectFavor(String userId);

    FolderQuiz insertQuiz(Long folderId, Long quizId);

    List<QuizLogRes> selectQuizLog(String studentId);
}

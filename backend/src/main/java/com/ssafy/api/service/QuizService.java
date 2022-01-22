package com.ssafy.api.service;

import com.ssafy.api.request.QuizOptionRegisterReq;
import com.ssafy.api.request.QuizRegisterReq;
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
}

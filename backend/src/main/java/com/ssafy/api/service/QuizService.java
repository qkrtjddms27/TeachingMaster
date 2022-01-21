package com.ssafy.api.service;

import com.ssafy.api.request.QuizOptionRegisterReq;
import com.ssafy.api.request.QuizRegisterReq;
import com.ssafy.db.entity.*;

import java.util.List;

public interface QuizService {
    Quiz createQuiz(QuizRegisterReq quizRegisterReq);
    List<QuizOption> createOption(List<QuizOptionRegisterReq> options);

    Quiz updateQuiz(QuizRegisterReq quizRegisterReq);
    List<QuizOption> updateOption(List<QuizOptionRegisterReq> options);

    void deleteQuiz(Long quizId);

    List<Folder> selectFolders(String userId);
}

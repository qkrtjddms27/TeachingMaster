package com.ssafy.api.service;


import com.ssafy.api.request.QuizOptionRegisterReq;
import com.ssafy.api.request.QuizRegisterReq;
import com.ssafy.db.entity.Folder;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.QuizOption;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.QuizOptionRepository;
import com.ssafy.db.repository.QuizOptionRepositorySupport;
import com.ssafy.db.repository.QuizRepository;
import com.ssafy.db.repository.QuizRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("QuizService")
public class QuizServiceImpl implements QuizService{

    @Autowired
    QuizOptionRepository quizOptionRepository;

    @Autowired
    QuizRepository quizRepository;

    @Autowired
    QuizRepositorySupport quizRepositorySupport;

    @Autowired
    QuizOptionRepositorySupport quizOptionRepositorySupport;

    @Override
    public Quiz createQuiz(QuizRegisterReq quizRegisterReq) {
        Quiz quiz = new Quiz();
        quiz.setSubject(quizRegisterReq.getSubject());
        quiz.setQuizPhoto(quizRegisterReq.getPhoto());
        quiz.setQuizTitle(quizRegisterReq.getTitle());
        quiz.setQuizContents(quizRegisterReq.getContents());
        quiz.setQuizAnswer(quizRegisterReq.getAnswer());
        quiz.setOpenStatus(quizRegisterReq.getStatus());
        quiz.setQuizTimeout(quizRegisterReq.getTimeout());
        quiz.setQuizGrade(quizRegisterReq.getGrade());

        User user = new User();
        user.setUserId(quizRegisterReq.getUserId());
        quiz.setUser(user);

        return quizRepository.save(quiz);
    }

    @Override
    public List<QuizOption> createOption(List<QuizOptionRegisterReq> options) {

        List<QuizOption> quizList = new ArrayList<>();

        for (QuizOptionRegisterReq option:options) {
            QuizOption quizOption = new QuizOption();
            quizOption.setOptionId(option.getOptionId());
            quizOption.setOptionContent(option.getOptionContent());

            Quiz quiz = new Quiz();
            quiz.setQuizId(option.getQuizId());
            quizOption.setQuiz(quiz);

            quizList.add(quizOption);
        }

        return quizOptionRepository.saveAll(quizList);
    }

    @Override
    public Quiz updateQuiz(QuizRegisterReq quizRegisterReq) {
        Quiz quiz = new Quiz();
        quiz.setQuizId(quizRegisterReq.getId());
        quiz.setSubject(quizRegisterReq.getSubject());
        quiz.setQuizPhoto(quizRegisterReq.getPhoto());
        quiz.setQuizTitle(quizRegisterReq.getTitle());
        quiz.setQuizContents(quizRegisterReq.getContents());
        quiz.setQuizAnswer(quizRegisterReq.getAnswer());
        quiz.setOpenStatus(quizRegisterReq.getStatus());
        quiz.setQuizTimeout(quizRegisterReq.getTimeout());
        quiz.setQuizGrade(quizRegisterReq.getGrade());

        User user = new User();
        user.setUserId(quizRegisterReq.getUserId());
        quiz.setUser(user);

        return quizRepository.save(quiz);
    }

    @Override
    @Transactional
    public List<QuizOption> updateOption(List<QuizOptionRegisterReq> options) {
        //해당 문제의 기존 보기들 전부 삭제
        Long quizId = options.get(0).getQuizId();
        quizOptionRepositorySupport.deleteOptionsByQuiz(quizId);

//        List<QuizOption> list  = quizOptionRepository.findByQuiz(remove_quiz);
//        for (QuizOption option : list) {
//            quizOptionRepository.deleteById(option.getOptionId());
//        }
//        System.out.println(lists.toString());

        List<QuizOption> quizList = new ArrayList<>();

        //새롭게 보기들 추가
        for (QuizOptionRegisterReq option:options) {
            QuizOption quizOption = new QuizOption();
            quizOption.setOptionIndex(option.getOptionIndex());
            quizOption.setOptionId(option.getOptionId());
            quizOption.setOptionContent(option.getOptionContent());

            Quiz quiz = new Quiz();
            quiz.setQuizId(option.getQuizId());
            quizOption.setQuiz(quiz);

            quizList.add(quizOption);
        }

        return quizOptionRepository.saveAll(quizList);
    }

    @Override
    @Transactional
    public void deleteQuiz(Long quizId) {
        quizOptionRepositorySupport.deleteOptionsByQuiz(quizId);
        quizRepository.deleteById(quizId);
    }

}
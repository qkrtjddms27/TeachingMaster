package com.ssafy.api.service;


import com.ssafy.api.request.QuizOptionRegisterReq;
import com.ssafy.api.request.QuizRegisterReq;
import com.ssafy.api.response.QuizOptionsRes;
import com.ssafy.api.response.QuizRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
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
    UserRepository userRepository;

    @Autowired
    FolderRepository folderRepository;

    @Autowired
    FolderQuizRepository folderQuizRepository;

    @Override
    public Quiz createQuiz(QuizRegisterReq quizRegisterReq, Long folderId) {
        Quiz quiz = new Quiz();
        quiz.setSubject(quizRegisterReq.getSubject());
        quiz.setQuizPhoto(quizRegisterReq.getQuizPhoto());
        quiz.setQuizTitle(quizRegisterReq.getQuizTitle());
        quiz.setQuizContents(quizRegisterReq.getQuizContents());
        quiz.setQuizAnswer(quizRegisterReq.getQuizAnswer());
        quiz.setOpenStatus(quizRegisterReq.getOpenStatus());
        quiz.setQuizTimeout(quizRegisterReq.getQuizTimeout());
        quiz.setQuizGrade(quizRegisterReq.getQuizGrade());

        //퀴즈 본문 저장
        User user = new User();
        user.setUserId(quizRegisterReq.getUserId());
        quiz.setUser(user);
        Quiz quizRes = quizRepository.save(quiz);

        //퀴즈와 폴더 매핑 후 FolderQuiz에 저장
        FolderQuiz folderQuiz = new FolderQuiz();
        folderQuiz.setFolder(folderRepository.findById(folderId).get());
        folderQuiz.setQuiz(quizRes);
        folderQuizRepository.save(folderQuiz);

        //퀴즈 보기 저장
        Long quizId = quizRes.getQuizId();
        List<QuizOptionRegisterReq> options = quizRegisterReq.getQuizOptions();
        List<QuizOption> quizList = new ArrayList<>();

        for (QuizOptionRegisterReq option:options) {
            QuizOption quizOption = new QuizOption();
            quizOption.setOptionId(option.getOptionId());
            quizOption.setOptionContent(option.getOptionContent());

            Quiz quizFk = new Quiz();
            quiz.setQuizId(quizId);
            quizOption.setQuiz(quiz);

            quizList.add(quizOption);
        }

        quizOptionRepository.saveAll(quizList);

        return quizRes;
    }

    @Override
    public Quiz updateQuiz(QuizRegisterReq quizRegisterReq) {
        Quiz quiz = new Quiz();
        quiz.setQuizId(quizRegisterReq.getQuizId());
        quiz.setSubject(quizRegisterReq.getSubject());
        quiz.setQuizPhoto(quizRegisterReq.getQuizPhoto());
        quiz.setQuizTitle(quizRegisterReq.getQuizTitle());
        quiz.setQuizContents(quizRegisterReq.getQuizContents());
        quiz.setQuizAnswer(quizRegisterReq.getQuizAnswer());
        quiz.setOpenStatus(quizRegisterReq.getOpenStatus());
        quiz.setQuizTimeout(quizRegisterReq.getQuizTimeout());
        quiz.setQuizGrade(quizRegisterReq.getQuizGrade());

        User user = new User();
        user.setUserId(quizRegisterReq.getUserId());
        quiz.setUser(user);

        Quiz quizRes = quizRepository.save(quiz);

        List<QuizOption> list  = quizOptionRepository.findByQuiz(quizRes);
        for (QuizOption option : list) {
            quizOptionRepository.delete(option);
        }

        List<QuizOption> quizList = new ArrayList<>();
        List<QuizOptionRegisterReq> quizOptionRegisterReqList = quizRegisterReq.getQuizOptions();
        //새롭게 보기들 추가
        for (QuizOptionRegisterReq option : quizOptionRegisterReqList) {
            QuizOption quizOption = new QuizOption();
            quizOption.setOptionIndex(option.getOptionIndex());
            quizOption.setOptionId(option.getOptionId());
            quizOption.setOptionContent(option.getOptionContent());

            quizOption.setQuiz(quizRes);

            quizList.add(quizOption);
        }

        quizOptionRepository.saveAll(quizList);

        return quizRes;
    }

    @Override
    public QuizRes selectQuiz(Long quizId) {
        QuizRes quizRes = new QuizRes();
        //quiz 본문 세팅
        Quiz quiz = quizRepository.findById(quizId).get();

        quizRes.setQuizId(quizId);
        quizRes.setSubject(quiz.getSubject());
        quizRes.setQuizPhoto(quiz.getQuizPhoto());
        quizRes.setQuizTitle(quiz.getQuizTitle());
        quizRes.setQuizContents(quiz.getQuizContents());
        quizRes.setQuizAnswer(quiz.getQuizAnswer());
        quizRes.setOpenStatus(quiz.getOpenStatus());
        quizRes.setQuizTimeout(quiz.getQuizTimeout());
        quizRes.setQuizGrade(quiz.getQuizGrade());
        quizRes.setQuizGrade(quiz.getQuizGrade());
        quizRes.setUserId(quiz.getUser().getUserId());

        //quiz option 세팅
        List<QuizOptionsRes> quizOptionsResList = new ArrayList<>();
        List<QuizOption> quizOptionList = quizOptionRepository.findByQuiz(quiz);

        for (QuizOption quizOption : quizOptionList) {
            QuizOptionsRes quizOptionsRes = new QuizOptionsRes();

            quizOptionsRes.setOptionId(quizOption.getOptionId());
            quizOptionsRes.setOptionIndex(quizOption.getOptionIndex());
            quizOptionsRes.setOptionId(quizOption.getOptionId());
            quizOptionsRes.setOptionContent(quizOption.getOptionContent());

            quizOptionsResList.add(quizOptionsRes);
        }

        quizRes.setQuizOptions(quizOptionsResList);

        return quizRes;
    }

    @Override
    public void deleteQuiz(Long quizId) {

        Quiz quiz = quizRepository.findById(quizId).get();

        //quiz options 삭제
        List<QuizOption> quizOptionList  = quizOptionRepository.findByQuiz(quiz);
        for (QuizOption option : quizOptionList) {
            quizOptionRepository.delete(option);
        }

        //folder_quiz 삭제
        List<FolderQuiz> folderQuizList = folderQuizRepository.findByQuiz(quiz);
        for (FolderQuiz folderQuiz : folderQuizList) {
            folderQuizRepository.delete(folderQuiz);
        }

        quizRepository.delete(quiz);
    }

    @Override
    public List<Folder> selectFolders(String userId) {
        User user = userRepository.findByUserId(userId).get();
        System.out.println("Service1 : " + user.getUserId());
        List<Folder> list = folderRepository.findByUser(user);

        return list;
    }

    @Override
    public List<Quiz> selectsFolderQuiz(Long folderId) {
        Folder folder = folderRepository.findById(folderId).get();
        System.out.println("folderIndex : "+folder.getFolderId());
        List<FolderQuiz> folderQuizList = folderQuizRepository.findByFolder(folder);

        List<Quiz> quizList = new ArrayList<>();
        for (FolderQuiz folderquiz : folderQuizList) {
            System.out.println("quizTitle : " + folderquiz.getQuiz().getQuizTitle());
            quizList.add(folderquiz.getQuiz());
        }

        return quizList;
    }

}
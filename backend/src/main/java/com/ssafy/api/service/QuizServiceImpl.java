package com.ssafy.api.service;


import com.ssafy.api.request.*;
import com.ssafy.api.response.QuizAllRes;
import com.ssafy.api.response.QuizLogRes;
import com.ssafy.api.response.QuizRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service("QuizService")
public class QuizServiceImpl implements QuizService{

    @Autowired
    QuizRepository quizRepository;

    @Autowired
    QuizRepositorySupport quizRepositorySupport;

    @Autowired
    UserRepository userRepository;

    @Autowired
    FolderRepository folderRepository;

    @Autowired
    FolderQuizRepository folderQuizRepository;

    @Autowired
    BookMarkRepository bookMarkRepository;

    @Autowired
    QuizLogRepository quizLogRepository;

    @Autowired
    StudentRepository studentRepository;

    @Override
    public Quiz createQuiz(QuizRegisterReq quizRegisterReq) {
        Quiz quiz = new Quiz();
        quiz.setSubject(quizRegisterReq.getSubject());
        quiz.setQuizPhoto(quizRegisterReq.getQuizPhoto());
        quiz.setQuizTitle(quizRegisterReq.getQuizTitle());
        quiz.setQuizContents(quizRegisterReq.getQuizContents());
        quiz.setQuizAnswer(quizRegisterReq.getQuizAnswer());
        quiz.setOpenStatus(quizRegisterReq.getOpenStatus());
        quiz.setQuizTimeout(quizRegisterReq.getQuizTimeout());
        quiz.setQuizGrade(quizRegisterReq.getQuizGrade());

        String[] options = quizRegisterReq.getOptions();
        quiz.setOption1(options[0]);
        quiz.setOption2(options[1]);
        quiz.setOption3(options[2]);
        quiz.setOption4(options[3]);

        //퀴즈 본문 저장
        User user = new User();
        user.setUserId(quizRegisterReq.getUserId());
        quiz.setUser(user);
        Quiz quizRes = quizRepository.save(quiz);

        //퀴즈와 폴더 매핑 후 FolderQuiz에 저장
//        FolderQuiz folderQuiz = new FolderQuiz();
//        folderQuiz.setFolder(folderRepository.findById(quizRegisterReq.getFolderId()).get());
//        folderQuiz.setQuiz(quizRes);
//        folderQuizRepository.save(folderQuiz);

        return quizRes;
    }

    @Override
    public Quiz updateQuiz(QuizUpdateReq quizRegisterReq) {
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
        String[] options = quizRegisterReq.getOptions();
        quiz.setOption1(options[0]);
        quiz.setOption2(options[1]);
        quiz.setOption3(options[2]);
        quiz.setOption4(options[3]);

        User user = new User();
        user.setUserId(quizRegisterReq.getUserId());
        quiz.setUser(user);

        Quiz quizRes = quizRepository.save(quiz);

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
        String[] options = new String[4];
        options[0] = quiz.getOption1();
        options[1] = quiz.getOption2();
        options[2] = quiz.getOption3();
        options[3] = quiz.getOption4();

        quizRes.setOptions(options);

        return quizRes;
    }

    @Override
    public void deleteQuiz(Long quizId) {

        Quiz quiz = quizRepository.findById(quizId).get();

        //folder_quiz 삭제
        List<FolderQuiz> folderQuizList = folderQuizRepository.findByQuiz(quiz);
        for (FolderQuiz folderQuiz : folderQuizList) {
            folderQuizRepository.delete(folderQuiz);
        }

        quizRepository.delete(quiz);
    }

    @Override
    public List<Folder> selectFolders(String userId) {
        User user = userRepository.findById(userId).get();
        System.out.println("Service1 : " + user.getUserId());
        List<Folder> list = folderRepository.findByUser(user);

        return list;
    }

    @Override
    public List<QuizAllRes> selectsFolderQuiz(Long folderId) {
        Folder folder = folderRepository.findById(folderId).get();
        List<QuizAllRes> folderQuizList = quizRepositorySupport.findFolderQuiz(folderId, folder.getUser().getUserId());
System.out.println(folder.getUser().getUserId());
        for (QuizAllRes curRes : folderQuizList) {

            String options[] = new String[4];
            options[0] = curRes.getOption1();
            options[1] = curRes.getOption2();
            options[2] = curRes.getOption3();
            options[3] = curRes.getOption4();

            curRes.setOptions(options);

            curRes.setFolderCheck(true);
        }

        return folderQuizList;
    }


    @Override
    public List<QuizAllRes> selectQuizAll(String userId) {

        List<QuizAllRes> quizAllResList = quizRepositorySupport.findAllFolderFavorQuiz(userId);
        for (QuizAllRes quiz:quizAllResList) {
            String options[] = new String[4];
            options[0] = quiz.getOption1();
            options[1] = quiz.getOption2();
            options[2] = quiz.getOption3();
            options[3] = quiz.getOption4();
            quiz.setOptions(options);
        }
        System.out.println(quizAllResList.get(0).getQuizId() + ", "+ quizAllResList.get(0).getQuizTitle());

        return quizAllResList;
    }

    @Override
    public Folder createFolder(FolderRegisterReq folderRegisterReq) {
        Folder folder = new Folder();
        folder.setUser(userRepository.findById(folderRegisterReq.getUserId()).get());
        folder.setFolderName(folderRegisterReq.getFolderName());

        Folder folderRes = folderRepository.save(folder);

        return folderRes;
    }

    @Override
    public Bookmark createFavor(FavorRegisterReq favorRegisterReq) {
        Bookmark bookmark = new Bookmark();
        bookmark.setQuiz(quizRepository.findById(favorRegisterReq.getQuizId()).get());
        bookmark.setUser(userRepository.findById(favorRegisterReq.getUserId()).get());

        Bookmark bookmarkRes = bookMarkRepository.save(bookmark);

        return bookmarkRes;
    }

    @Override
    public List<QuizAllRes> selectFavor(String userId) {

        List<QuizAllRes> quizAllResList = quizRepositorySupport.findFavorQuiz(userId);
        for (QuizAllRes quiz:quizAllResList) {
            String options[] = new String[4];
            options[0] = quiz.getOption1();
            options[1] = quiz.getOption2();
            options[2] = quiz.getOption3();
            options[3] = quiz.getOption4();
            quiz.setOptions(options);
        }


        return quizAllResList;
    }

    @Override
    public FolderQuiz insertQuiz(FolderQuizEnterReq folderQuizEnterReq) {
        FolderQuiz folderQuiz = new FolderQuiz();
        folderQuiz.setQuiz(quizRepository.findById(folderQuizEnterReq.getQuizId()).get());
        folderQuiz.setFolder(folderRepository.findById(folderQuizEnterReq.getFolderId()).get());

        FolderQuiz folderQuizRes = folderQuizRepository.save(folderQuiz);

        return folderQuizRes;
    }

    @Override
    public List<QuizLogRes> selectQuizLog(String studentId) {
        List<QuizLogRes> quizLogResList = quizRepositorySupport.findQuizLog(studentId);

        for (QuizLogRes quizLogRes : quizLogResList) {

            String[] options = new String[4];
            options[0] = quizLogRes.getOption1();
            options[1] = quizLogRes.getOption2();
            options[2] = quizLogRes.getOption3();
            options[3] = quizLogRes.getOption4();

            quizLogRes.setOptions(options);
        }

        return quizLogResList;
    }

    @Override
    public void deleteFolderQuiz(Long folderId, Long quizId) {
        Folder folder = folderRepository.findById(folderId).get();
        Quiz quiz = quizRepository.findById(quizId).get();
        FolderQuiz folderQuiz = folderQuizRepository.findByFolderAndQuiz(folder, quiz);

        folderQuizRepository.delete(folderQuiz);
    }

    @Override
    public void deleteBookmark(String userId, Long quizId) {
        User user = userRepository.findById(userId).get();
        Quiz quiz = quizRepository.findById(quizId).get();
        Bookmark bookmark = bookMarkRepository.findByUserAndQuiz(user, quiz);

        bookMarkRepository.delete(bookmark);
    }

    @Override
    public void deleteFolder(Long folderId) {
        Folder folder = folderRepository.findById(folderId).get();
        List<FolderQuiz> folderQuizList = folderQuizRepository.findByFolder(folder);
        for (FolderQuiz folderquiz: folderQuizList) {
            folderQuizRepository.delete(folderquiz);
        }
        folderRepository.delete(folder);
    }

    @Override
    public void createQuizLog(List<QuizLogReq> quizLogReq) {
        for (int i = 0; i < quizLogReq.size();i++) {
            QuizLog quizLog = new QuizLog();

            Quiz quiz = quizRepository.findById(quizLogReq.get(i).getQuizId()).get();
            Student student = studentRepository.findById(quizLogReq.get(i).getStudentId()).get();

            quizLog.setQuiz(quiz);
            quizLog.setStudent(student);
            quizLog.setQuizResult(quizLogReq.get(i).getStudentResult());
            quizLog.setQuizResult(quizLogReq.get(i).getStudentResult());

            quizLogRepository.save(quizLog);
        }
//        return quizLogRepository.save(quizLog);
    }
}
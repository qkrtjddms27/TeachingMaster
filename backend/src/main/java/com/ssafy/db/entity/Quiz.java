package com.ssafy.db.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizId;                     //퀴즈아이디

    @Column(length = 10, nullable = false)
    private String subject;                 //과목

    @Column(length = 100)
    private String quizPhoto;               //사진

    @Column(length = 20, nullable = false)
    private String quizTitle;               //퀴즈제목

    @Column(length = 500, nullable = false)
    private String quizContents;            //퀴즈내용

    @Column(nullable = false)
    private int quizAnswer;                 //퀴즈정답

    private Boolean openStatus;             //공개여부

    private int quizTimeout;                //제한시간

    @Column(nullable = false)       
    private int quizGrade;                  //학년

    private String options[];


    //선생님 연결
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

}

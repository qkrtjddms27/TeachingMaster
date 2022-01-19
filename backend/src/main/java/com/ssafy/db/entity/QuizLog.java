package com.ssafy.db.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@IdClass(QuizLogId.class)
public class QuizLog implements Serializable {
    //학생 연결
    //Student student;
//    @Id
//    @ManyToOne
//    @JoinColumn(name = "studentId")
//    private Student student;

    //퀴즈 연결
    //Quiz quiz;
    @Id
    @ManyToOne
    @JoinColumn(name = "quizId")
    private Quiz quiz;


    private boolean quizResult; //정답유무

    @Temporal(TemporalType.DATE) //출제날짜
    private Date quizDate;

    private int quizAnswer; //선택한 답
}

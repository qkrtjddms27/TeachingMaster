package com.ssafy.db.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@IdClass(QuizLogId.class)
public class QuizLog {
    //학생 연결
    //Student student;
    @Id
    @ManyToOne
    @JoinColumn(name = "studentId")
    private Student student;

    //퀴즈 연결
    //Quiz quiz;
    @Id
    @ManyToOne
    @JoinColumn(name = "quizId")
    private Quiz quiz;

    private Boolean quizResult; //정답유무

    @CreationTimestamp
    private Date quizDate; //출제날짜

    private int selectAnswer; //선택한 답
}

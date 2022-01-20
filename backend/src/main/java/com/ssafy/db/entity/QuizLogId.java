package com.ssafy.db.entity;

import java.io.Serializable;

public class QuizLogId implements Serializable {
    private int quiz;
    private String student;

    public QuizLogId(){}
    public QuizLogId(int quiz, String student){
        this.quiz = quiz;
        this.student = student;
    }
}

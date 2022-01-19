package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Quiz {

    @Id
    @GeneratedValue
    private int quizId;

    @Column(length = 10, nullable = false)
    private String subject;

    @Column(length = 100)
    private String quizPhoto;

    @Column(length = 20, nullable = false)
    private String quizTitle;

    @Column(length = 500, nullable = false)
    private String quizContents;

    @Column(nullable = false)
    private int quizAnswer;

    private boolean openStatus;

    private int quizTimeout;

    @Column(nullable = false)
    private int quizGrade;

    @JoinColumn(name = "user_id")
    User user;

    private Folder folder;
}

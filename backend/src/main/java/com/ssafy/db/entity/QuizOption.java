package com.ssafy.db.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
public class QuizOption {
    @Id
    @GeneratedValue
    private Long optionIndex;          //index

    private Long optionId;             //문제번호

    @Column(length = 100, nullable = false)
    private String optionContent;      //내용

    //퀴즈와 연결
    @ManyToOne
    @JoinColumn(name = "quizId")
    private Quiz quiz;
}

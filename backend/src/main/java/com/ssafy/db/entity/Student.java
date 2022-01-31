package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Student {

//  기본키 설정 및 연관 관계 설정 시작
    @Id
    @Column(length = 20)
    private String studentId;
//  기본키 설정 및 연관 관계 설정 끝

    @Column(nullable = false, length = 20)
    private String studentName;

    @Column(length = 20)
    private String studentPhone;

    @Column(length = 40000)
    private String studentProfile;

    private int studentScore;

    @Column(length = 20)
    private String studentEmail;

    private int countingStar;

    @Column(nullable = false, length = 20)
    private String parentsName;

    @Column(nullable = false, length = 100)
    private String address;

    @Column(nullable = false, length = 10)
    private String relation;

    @Column(length = 20)
    private String parentsPhone;

    @ManyToOne
    @JoinColumn(name = "roomId")
    private Room room;


}
package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
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

    @Builder
    public Student(String studentId, String studentName, String studentPhone, String studentProfile, int studentScore, String address,
                   String studentEmail, int countingStar, String parentsName, String relation, String parentsPhone, Room room) {
        this.studentId = studentId;
        this.studentEmail = studentEmail;
        this.studentName = studentName;
        this.studentPhone = studentPhone;
        this.studentProfile = studentProfile;
        this.studentScore = studentScore;
        this.address = address;
        this.countingStar = countingStar;
        this.parentsName = parentsName;
        this.parentsPhone = parentsPhone;
        this.relation = relation;
        this.room = room;
    }

}
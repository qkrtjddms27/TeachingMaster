package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;
import org.checkerframework.checker.units.qual.C;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Room {

//  Room 기본키 생성 및 양방향 Mapping 시작(Conference와 Student)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long roomId;
//
//    //Conference
//    @OneToOne(mappedBy = "room")
//    private Conference conference;
//
//    //Student
//    @OneToMany(mappedBy = "room")
//    private List<Student> students = new ArrayList<>();

//  Room 기본키 생성 및 양방향 Mapping 끝

    @Column(nullable = false)
    private int roomGrade;

    @Column(nullable = false)
    private int roomNum;
}

package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Conference {
    //기본키 설정 및 ConferenceHistory와의 양방향 관계 시작
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long conferenceId;
//
//    @OneToMany(mappedBy = "conference")
//    private List<ConferenceHistory> conferenceHistories = new ArrayList<>();
//
//    @OneToMany(mappedBy = "conference")
//    private List<ConferenceLog> conferenceLogs = new ArrayList<>();
    //기본키 설정 및 ConferenceHistory와의 양방향 관계 끝


    @Column(nullable = false, length = 255)
    private String lessonUrl;

    @Temporal(TemporalType.TIMESTAMP)
    private Date callStartTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Date callEndTime;

    @Column(length = 100)
    private String thumbnailUrl;

    @Column(length = 20)
    private String conferenceTitle;

    @Column(length = 100)
    private String description;

    @Column(nullable = false)
    private boolean isActive;

    @OneToOne
    @JoinColumn(name = "roodId")
    private Room room;
}

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
public class ConferenceHistory {

//  기본키 생성 및 연관관계 설정 시작
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int conferenceIndex;
//
//    @JoinColumn
//    @OneToMany(mappedBy = "conferenceHistory")
//    private List<ConferenceLog> conferenceLogs = new ArrayList<>();
//  기본키 생성 및 연관관계 설정 시작

    @Temporal(TemporalType.DATE)
    private Date conferenceDate;

    @Temporal(TemporalType.TIME)
    private Date conferenceStartTime;

    @Temporal(TemporalType.TIME)
    private Date conferenceEndTime;


    @JoinColumn(name = "conferenceId")
    @ManyToOne
    private Conference conference;

}

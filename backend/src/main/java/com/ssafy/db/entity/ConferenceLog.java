package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class ConferenceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long conference_long_id;

    @Column(length = 20)
    private String event;   //IN, OUT, SCORE, PRIZE

    @Temporal(TemporalType.TIMESTAMP)
    private Date eventTime;

    @ManyToOne
    @JoinColumn(name = "conferenceId")
    private Conference conference;

    @ManyToOne
    @JoinColumn(name = "conferenceIndex")
    private ConferenceHistory conferenceHistory;

    @ManyToOne
    @JoinColumn(name = "studentId")
    private Student student;
}
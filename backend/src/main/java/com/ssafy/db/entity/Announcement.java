package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Announcement {
    @Id
    @GeneratedValue
    private long announcementIndex;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "studentId")
    private Student student;

    @Column(length = 100)
    private String announcementMemo;
    private int announcementScore;

}

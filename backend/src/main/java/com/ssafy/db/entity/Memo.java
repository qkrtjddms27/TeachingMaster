package com.ssafy.db.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class Memo {
    //식별관계
    @Id @JoinColumn(name = "studentId")
    private Student student;

    @Id @JoinColumn(name = "userId")
    private User user;

    @Temporal(TemporalType.TIMESTAMP)
    private Date memoDate;

    @Column(length = 255)
    private String memoContent;
}

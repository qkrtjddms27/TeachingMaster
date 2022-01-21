package com.ssafy.db.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@IdClass(MemoId.class)
public class Memo {
    //식별관계
    @Id
    @ManyToOne
    @JoinColumn(name = "studentId")
    private Student student;

    @Id
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @Temporal(TemporalType.TIMESTAMP)
    private Date memoDate;

    @Column(length = 255)
    private String memoContent;
}

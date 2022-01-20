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
public class Memo implements Serializable {
    //식별관계
    @Id
    @JoinColumn(name = "studentId")
    private long studentId;

    @Id
    @JoinColumn(name = "userId")
    private long userId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date memoDate;

    @Column(length = 255)
    private String memoContent;
}

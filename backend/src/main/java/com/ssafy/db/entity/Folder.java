package com.ssafy.db.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
public class Folder {
    @Id
    @Column(nullable = false)
    private Long folderId;       //폴더ID

    @Column(length = 64)
    private String subName;     //폴더이름


    //선생님 연결
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}

package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

@Entity
@Getter
@Setter
public class Bookmark {
    @Id @JoinColumn(name = "userId")
    User user;

    @Id @JoinColumn(name = "quizId")
    Quiz quiz;
}

package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor

public class QuizLogId implements Serializable {
    private long quiz;
    private String student;

}

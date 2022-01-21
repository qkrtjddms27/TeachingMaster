package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor

public class MemoId implements Serializable {
    private String student;
    private String user;
}

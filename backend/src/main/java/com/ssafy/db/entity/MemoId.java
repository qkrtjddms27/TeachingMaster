package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
public class MemoId implements Serializable {
    private long studentId;
    private long userId;
}

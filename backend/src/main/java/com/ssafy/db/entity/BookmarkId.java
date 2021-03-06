package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
public class BookmarkId implements Serializable {
    private String user;
    private long quiz;
}

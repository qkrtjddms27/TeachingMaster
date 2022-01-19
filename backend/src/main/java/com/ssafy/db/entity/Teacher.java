package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
public class Teacher{
    @Id
    @Column(length = 20)
    private String teacherId;
    private boolean master;

    @Column(length = 20 ,nullable = false)
    private String teacherName;

    @Column(length = 100)
    private String teacherProfile;
    private boolean teacherHomeroom;

    //FK
    private int classId;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String teacherPassword;
}

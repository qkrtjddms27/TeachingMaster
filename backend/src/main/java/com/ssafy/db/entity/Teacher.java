package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
public class Teacher extends BaseEntity{
    String teacherId;
    boolean master;
    String teacherName;
    String teacherProfile;
    boolean teacherHomeroom;


    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String teacherPassword;
}

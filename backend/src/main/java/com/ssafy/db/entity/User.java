package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
public class User {
    @Id
    @Column(length = 20)
    private String userId;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;

    @Column(length = 20 ,nullable = false)
    private String userName;

    @Column(length = 100)
    private String userProfile;

    private boolean userHomeroom;

    private boolean master;

    @ManyToOne
    @JoinColumn(name = "roomId")
    private Room room;


}

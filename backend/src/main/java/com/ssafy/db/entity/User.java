package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @Column(length = 20 ,nullable = false)
    private String userId ;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;

    @Column(length = 20 ,nullable = false)
    private String userName;

    @Column(columnDefinition = "LONGTEXT")
    private String userProfile;

    @Column(length = 100 ,nullable = false)
    private Boolean userHomeroom;

    @Column(length = 100 ,nullable = false)
    private Boolean master;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "roomId")
    private Room room;

    @Builder
    public User(String userId, String password, String userProfile, Boolean userHomeroom, Boolean master, Room room){
        this.userId = userId;
        this.password = password;
        this.userProfile = userProfile;
        this.userHomeroom = userHomeroom;
        this.master = master;
        this.room = room;
    }
}

package com.ssafy.db.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@IdClass(BookmarkId.class)
public class Bookmark implements Serializable {
    @Id
    @JoinColumn(name = "userId")
    private long userId;

    @Id
    @JoinColumn(name = "quizId")
    private long quizId;
}

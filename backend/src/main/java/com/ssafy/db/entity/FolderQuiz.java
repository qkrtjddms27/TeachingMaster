package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class FolderQuiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long folderQuizId;

    @ManyToOne
    @JoinColumn(name = "folderId")
    Folder folder;

    @ManyToOne
    @JoinColumn(name = "quizId")
    Quiz quiz;
}

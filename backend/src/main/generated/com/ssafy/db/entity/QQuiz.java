package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QQuiz is a Querydsl query type for Quiz
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QQuiz extends EntityPathBase<Quiz> {

    private static final long serialVersionUID = 846425367L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QQuiz quiz = new QQuiz("quiz");

    public final QFolder folder;

    public final BooleanPath openStatus = createBoolean("openStatus");

    public final NumberPath<Integer> quizAnswer = createNumber("quizAnswer", Integer.class);

    public final StringPath quizContents = createString("quizContents");

    public final NumberPath<Integer> quizGrade = createNumber("quizGrade", Integer.class);

    public final NumberPath<Long> quizId = createNumber("quizId", Long.class);

    public final StringPath quizPhoto = createString("quizPhoto");

    public final NumberPath<Integer> quizTimeout = createNumber("quizTimeout", Integer.class);

    public final StringPath quizTitle = createString("quizTitle");

    public final StringPath subject = createString("subject");

    public final QUser user;

    public QQuiz(String variable) {
        this(Quiz.class, forVariable(variable), INITS);
    }

    public QQuiz(Path<? extends Quiz> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QQuiz(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QQuiz(PathMetadata metadata, PathInits inits) {
        this(Quiz.class, metadata, inits);
    }

    public QQuiz(Class<? extends Quiz> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.folder = inits.isInitialized("folder") ? new QFolder(forProperty("folder"), inits.get("folder")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}


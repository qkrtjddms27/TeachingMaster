package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QTeacher is a Querydsl query type for Teacher
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTeacher extends EntityPathBase<Teacher> {

    private static final long serialVersionUID = -1993379360L;

    public static final QTeacher teacher = new QTeacher("teacher");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final BooleanPath master = createBoolean("master");

    public final BooleanPath teacherHomeroom = createBoolean("teacherHomeroom");

    public final StringPath teacherId = createString("teacherId");

    public final StringPath teacherName = createString("teacherName");

    public final StringPath teacherPassword = createString("teacherPassword");

    public final StringPath teacherProfile = createString("teacherProfile");

    public QTeacher(String variable) {
        super(Teacher.class, forVariable(variable));
    }

    public QTeacher(Path<? extends Teacher> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTeacher(PathMetadata metadata) {
        super(Teacher.class, metadata);
    }

}


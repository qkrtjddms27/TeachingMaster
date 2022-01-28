package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Student;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("studentListRes")
public class StudentListRes extends BaseResponseBody {
    @ApiModelProperty(name="학생목록")
    private List<Student> students = new ArrayList<>();

    public static StudentListRes of(List<Student> students, Integer statusCode, String message){
        StudentListRes studentListRes = new StudentListRes();
        studentListRes.setStudents(students);
        studentListRes.setStatusCode(statusCode);
        studentListRes.setMessage(message);
        return studentListRes;
    }
}

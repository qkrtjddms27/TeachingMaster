package com.ssafy.api.request;

import com.ssafy.api.service.RoomService;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.Student;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
@ApiModel("StudentScoreUpRequest")
public class StudentScoreUpReq {
    @ApiModelProperty(name="학생 코드", example="A12312B")
    private String studentId;

}

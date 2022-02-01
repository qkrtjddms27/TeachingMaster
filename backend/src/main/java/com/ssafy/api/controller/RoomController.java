package com.ssafy.api.controller;

import com.ssafy.api.request.RoomInfoRegisterPostReq;
import com.ssafy.api.request.RoomInfoUpdateReq;
import com.ssafy.api.request.StudentInfoUpdateReq;
import com.ssafy.api.service.RoomService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Api(value = "반 API", tags = {"Room"})
@RestController
@RequestMapping("/api/room")
public class RoomController {
    @Autowired
    RoomService roomService;

    @PostMapping()
    @ApiOperation(value = "반 등록", notes = "<strong>학년, 반</strong>를 통해 추가한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value="반 등록 정보", required = true) RoomInfoRegisterPostReq registerInfo) {

        Room roomInfo = new Room();
        roomInfo.setRoomGrade(registerInfo.getRoomGrade());
        roomInfo.setRoomNum(registerInfo.getRoomNum());

        Room room = roomService.createRoom(roomInfo);
        return room != null ? ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"))
                : ResponseEntity.status(200).body(BaseResponseBody.of(200, "이미 존재하는 학급입니다."));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/{room_grade}/{room_num}")
    @ApiOperation(value = "반 삭제", notes = "반 정보를 통해 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })public ResponseEntity<? extends BaseResponseBody> delete(
            @PathVariable("room_grade") int roomGrade,
            @PathVariable("room_num") int roomNum){
        roomService.deleteRoom(roomGrade, roomNum);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

//    @PutMapping()
//    @ApiOperation(value = "반 정보 수정", notes = "반 정보를 통해 수정한다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 401, message = "인증 실패"),
//            @ApiResponse(code = 404, message = "사용자 없음"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })public ResponseEntity<? extends BaseResponseBody> update(
//            @RequestBody @ApiParam(value="반 정보", required = true) RoomInfoUpdateReq updateInfo){
//        Room updateRoom = new Room();
//        updateRoom.setRoomGrade(updateInfo.getRoomGrade());
//        updateRoom.setRoomNum(updateInfo.getRoomNum());
//        roomService.updateRoom(updateRoom);
//
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//    }
}

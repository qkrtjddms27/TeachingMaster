package com.ssafy.api.service;

import com.ssafy.db.entity.Room;

public interface RoomService {
    Room createRoom(Room roomInfo);
    void deleteRoom(int roomGrade, int roomNum);
    Room updateRoom(Room roomInfo);
    Room getRoomByRoomId(long roomId);
    Room getRoomByRoomGradeAndRoomNum(int roomGrade, int roomNum);
}

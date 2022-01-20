package com.ssafy.api.service;

import com.ssafy.db.entity.Room;

public interface RoomService {
    Room createRoom(Room roomInfo);
    void deleteRoom(String roomId);
    Room updateStudent(String roomId, Room room);
    Room getRoomByRoomId(String roomId);
    Room getRoomByRoomGradeAndRoomNum(int roomGrade, int roomNum);
}

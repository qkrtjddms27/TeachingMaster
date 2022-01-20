package com.ssafy.api.service;

import com.ssafy.db.entity.Room;
import com.ssafy.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomServiceImpl implements RoomService{

    @Autowired
    RoomRepository roomRepository;

    @Override
    public Room createRoom(Room roomInfo) {
        Room room = new Room();
        room.setRoomGrade(roomInfo.getRoomGrade());
        room.setRoomNum(roomInfo.getRoomNum());
        return roomRepository.save(room);
    }

    @Override
    public Room getRoomByRoomId(String roomId) {

        return null;
    }

    @Override
    public Room getRoomByRoomGradeAndRoomNum(int roomGrade, int roomNum) {
        return roomRepository.findByRoomGradeAndRoomNum(roomGrade, roomNum).get();
    }

    @Override
    public void deleteRoom(String roomId) {

    }

    @Override
    public Room updateStudent(String roomId, Room room) {
        return null;
    }
}

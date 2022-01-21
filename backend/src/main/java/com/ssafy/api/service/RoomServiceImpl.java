package com.ssafy.api.service;

import com.ssafy.db.entity.Room;
import com.ssafy.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("RoomService")
public class RoomServiceImpl implements RoomService{

    @Autowired
    RoomRepository roomRepository;

    @Override
    public Room createRoom(Room roomInfo) {
        Room searchRoom = roomRepository.findByRoomGradeAndRoomNum(roomInfo.getRoomGrade(), roomInfo.getRoomNum());
        if(searchRoom != null){
            return null;
        }

        Room room = new Room();
        room.setRoomGrade(roomInfo.getRoomGrade());
        room.setRoomNum(roomInfo.getRoomNum());
        return roomRepository.save(room);
    }

    @Override
    public Room getRoomByRoomId(long roomId) {
        return roomRepository.findById(roomId).get();
    }

    @Override
    public Room getRoomByRoomGradeAndRoomNum(int roomGrade, int roomNum) {
        return roomRepository.findByRoomGradeAndRoomNum(roomGrade, roomNum);
    }

    @Override
    public void deleteRoom(int roomGrade, int roomNum) {
        Room deleteRoom = roomRepository.findByRoomGradeAndRoomNum(roomGrade, roomNum);
        if(deleteRoom == null)
            return;
        roomRepository.deleteById(deleteRoom.getRoomId());
    }

    @Override
    public Room updateRoom(Room roomInfo) {
        Room updateRoom = getRoomByRoomGradeAndRoomNum(roomInfo.getRoomGrade(), roomInfo.getRoomNum());
        if(updateRoom == null) {
            return null;
        }
        updateRoom.setRoomGrade(roomInfo.getRoomGrade());
        updateRoom.setRoomNum(roomInfo.getRoomNum());
        return updateRoom;
    }
}

package com.ssafy.api.service;

import com.ssafy.api.request.RoomRegisterPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserUpdateReq;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("roomService")
public class RoomServiceImpl implements RoomService {
//	@Autowired
//	RoomRepository roomRepository;
//
//	@Override
//	public Room createRoom(RoomRegisterPostReq roomRegisterInfo) {
//		Room room = new Room();
//		room.setRoomNum(roomRegisterInfo.getRoomNum());
//		room.setRoomGrade(roomRegisterInfo.getRoomGrade());
//
//		return roomRepository.save(room);
//	}




}

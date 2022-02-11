package com.ssafy.api.service;

import com.ssafy.api.request.ConferenceUpdateReq;
import com.ssafy.api.response.ConferenceRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.ConferenceRepository;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ConferenceService")
public class ConferenceServiceImpl implements ConferenceService{

    @Autowired
    ConferenceRepository conferenceRepository;

    @Autowired
    UserRepositorySupport userRepositorySupport;


    @Override
    public Conference updateConf(ConferenceUpdateReq updateInfo) {
        User user = userRepositorySupport.findUserByUserId(updateInfo.getUserId()).orElse(null);
        //int roomGrade, int roomNum
        Conference search = conferenceRepository.findByRoom(user.getRoom());
        if(updateInfo.getButtonValue() == 0){
            search.setActive(true);
        }
        else{
            search.setActive(false);
        }
        return conferenceRepository.save(search);
    }

    @Override
    public List<ConferenceRes> searchConf(){
        List<ConferenceRes> find = userRepositorySupport.findUserByRoomAndIsActive();
        return userRepositorySupport.findUserByRoomAndIsActive();
    }
}

package com.ssafy.api.service;

import com.ssafy.api.request.ConferenceUpdateReq;
import com.ssafy.api.response.ConferenceRes;
import com.ssafy.db.entity.Conference;

import java.util.List;

public interface ConferenceService {
    Conference updateConf(ConferenceUpdateReq updateInfo);
    List<ConferenceRes> searchConf();
}

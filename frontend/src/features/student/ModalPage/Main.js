import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { serverUrl, setToken } from '../../../components/TOKEN';
import axios from 'axios';
import '../scss/modal.scss'

const ModalMain = ({change,student,onClose}) => {
  const [memos,setMemos] = useState([])
  // 메모 get
  useEffect(()=>{
    axios({
      url: `${serverUrl}/memo/${student.studentId}`,
      method: 'GET',
      headers: setToken()
    })
    .then(({data}) => {
      setMemos(data)
    })
    .catch(err => console.log('get memo list err:', err))
  }, [])

  return (
    <div className='modal-main'>
      <div className='left'>
        <div className='left_top' >
          {/* <img className='image' alt='학생사진' src={student.studentProfile} /> */}
          <img className='image' alt='학생사진' src={student.studentProfile} />
          <div>
            <div className='name'>{student.studentName}</div>
            <div className='stars'>이번주 ⭐&nbsp;{student.countingStar}</div>
            <div className='stars'>누적&emsp;&nbsp;⭐&nbsp;{student.studentScore}</div>
            <p>{student.room.roomGrade}학년 {student.room.roomNum}반</p>
          </div>
        </div>
        <div className='left_bot'>
          <div className='contents'>  
            <p>메일주소 : {student.studentEmail}</p>
            <p>연락처 : {student.studentPhone.slice(0,3)}-{student.studentPhone.slice(3,7)}-{student.studentPhone.slice(7,11)}</p>
            <p>주소 : {student.address}</p>
            <p>보호자 성함 : {student.parentsName}</p>
            <p>보호자 관계 : {student.relation}</p>
            <p>보호자 연락처: {student.parentsPhone.slice(0,3)}-{student.parentsPhone.slice(3,7)}-{student.parentsPhone.slice(7,11)}</p>
          </div>
          <Button onClick={()=>{change("quiz")}}>퀴즈 내역 보기</Button>
        </div>
      </div>
        <div className='right'>
          <div className='memo'>
            <p className='memo_title'>메모</p>
            <div className='memo_contents'>
              {memos.map((memo, idx) => 
                <li key={idx}>{memo.memoContent}</li>
              )}
            </div>
          </div>
          <Button onClick={()=>{change("update")}} className='go_update'>수정</Button>
          <Button onClick={onClose} className='go_exit'>종료</Button>
        </div>
    </div>
  );
};

export default ModalMain;

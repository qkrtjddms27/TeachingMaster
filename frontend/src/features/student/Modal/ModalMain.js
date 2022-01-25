import React from 'react';
import { Button } from '@chakra-ui/react';
import './modal.scss'

const ModalMain = ({change,student,onClose}) => {
  return (
    <div className='modal-main'>
      <div className='left'>
        <div className='left_top' >
          <img className='image' alt='학생사진' src={student.profile} />
          <div>
            <div className='name'>{student.name}</div>
            <div className='stars'>이번주 ⭐&nbsp;{student.star}</div>
            <div className='stars'>누적&emsp;&nbsp;⭐&nbsp;{student.star*2}</div>
          </div>
        </div>
        <div className='left_bot'>
          <div className='contents'>  
            <p>메일주소 : {student.email}</p>
            <p>연락처 : {student.phone}</p>
            <p>보호자 성함 : 김동수</p>
            <p>보호자 관계 : 아버지</p>
            <p>보호자 연락처: {student.phone}</p>
          </div>
          <Button onClick={()=>{change("quiz")}}>퀴즈 내역 보기</Button>
        </div>
      </div>

        <div className='right'>
          <div className='memo'>
            <p className='memo_title'>메모</p>
            <div className='memo_contents'>
              <p>우리반 반장</p>
              <p>선생님을 잘 따른다</p>
              <p>지난 기말고사 1등</p>
            </div>

          </div>

          <Button onClick={()=>{change("update")}} className='go_update'>수정</Button>
          <Button onClick={onClose} className='go_exit'>종료</Button>
        </div>
    </div>
  );
};

export default ModalMain;

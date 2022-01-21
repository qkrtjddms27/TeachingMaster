import React from 'react';
import { Button } from '@chakra-ui/react';
import './modal.scss'

const ModalMain = ({change,student,onClose}) => {
  return (
    <div className='modal-main'>
      <div className='img-name-star'>
        <img className='image' alt='학생사진' src={student.profile} />
        <div>
          <div className='card-title'>{student.name}</div>
          <div className='stars'>⭐&nbsp;{student.star}</div>
        </div>
      </div>

      <div className='contents'>
        <p>누적 ⭐&nbsp;{student.star*2}</p>
        <p>메일주소&nbsp; {student.email}</p>
        <p>연락처&nbsp; {student.phone}</p>
      </div>

      <div className='memo'>
        <p className='memotitle'>메모</p>
          <p>우리반 반장</p>
          <p>선생님을 잘 따른다</p>
          <p>지난 기말고사 1등</p>
      </div>
      <Button onClick={onClose} className='go_update'>종료</Button>
      <Button onClick={()=>{change("update")}}className='go_update'>수정</Button>
    </div>
  );
};

export default ModalMain;

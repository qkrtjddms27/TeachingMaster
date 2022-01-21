import React from 'react';
import { Button } from '@chakra-ui/react';
import './modal.scss'

const ModalUpdate = ({change,student,onClose}) => {
  const onClick = ()=>{
    onClose()
    change("main")
  }
  return (
    <div>
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
          <p>여기는 수정페이지</p>
      </div>
      <Button onClick={()=>{change("main")}} className='go_update'>
        뒤로
      </Button>

      <Button onClick={()=>{onClick()}} className='go_update'>
        저장
      </Button>
  </div>
  );
};

export default ModalUpdate;

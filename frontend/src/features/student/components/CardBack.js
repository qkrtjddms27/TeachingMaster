import React from 'react';
import {Box,Text} from '@chakra-ui/react'
const CardBack = ({onOpen,student}) => {
  return (
    <Box onClick={onOpen} className='b-cardbox'>
      <div className='img-name-star'>
        {/* <img className='image' alt='학생사진' src={student.studentProfile} /> */}
        <img className='image' alt='학생사진' src={student.studentProfile} />
        <div>
          <div className='card-title'>{student.studentName}</div>
          <div className='stars'>⭐&nbsp;{student.countingStar}</div>
          <div>{student.room.roomGrade}학년 {student.room.roomNum}반</div>
        </div>
      </div>
      <div className='memo'>
          <Text className='stars'>누적⭐&nbsp;{student.studentScore}</Text>
          <Text className='stars'>연락처 : 010-{student.studentPhone.slice(0,4)}-{student.studentPhone.slice(4,8)}</Text>
          <Text className='memo-title'>보호자</Text>
          <Text className='memo-content'>이름 : {student.parentsName}</Text>
          <Text className='memo-content'>연락처 : 010-{student.parentsPhone.slice(0,4)}-{student.parentsPhone.slice(4,8)}</Text>
          <Text className='memo-content'>관계 : {student.relation}</Text>
      </div>   
    </Box>
  );
};

export default CardBack;

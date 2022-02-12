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
          <Text className='stars'>보호자 : {student.parentsName}</Text>
          <Text className='stars'>보호자 연락처 : {student.parentsPhone}</Text>
          <Text className='stars'>보호자 : {student.parentsName}</Text>
          {/* <Text className='memo-title'>메모</Text>
          <Text className='memo-content'>우리반 반장</Text>
          <Text className='memo-content'>선생님을 잘 따른다</Text>
          <Text className='memo-content'>지난 기말고사 1등</Text> */}
      </div>   
    </Box>
  );
};

export default CardBack;

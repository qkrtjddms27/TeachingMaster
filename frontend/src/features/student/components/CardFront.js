import React from 'react';
import {Box} from '@chakra-ui/react'
import { Card } from 'react-bootstrap';
const CardFront = ({student}) => {
  return (
    <Box className='f-cardbox' >
      {/* <img className='image' alt='학생사진' src={student.studentProfile} /> */}
      <img className='image' alt='학생사진' src={student.studentProfile} />
        
      <div className='card-body'>
      <Card.Text className='stars'>
        ⭐{student.countingStar}
        </Card.Text>
        <Card.Title className='card-title'>
            {student.studentName}
        </Card.Title>
            {student.room.roomGrade}-{student.room.roomNum}반
      </div>
    </Box>
  );
};

export default CardFront;

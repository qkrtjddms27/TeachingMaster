import React from 'react';
import {Box} from '@chakra-ui/react'
import { Card } from 'react-bootstrap';
import '../scss/student.scss'

const CardFront = ({student}) => {
  return (
    <Box className='f-cardbox' >
      <img className='image' alt='학생사진' src={student.studentProfile} />
      <div className='card-body'>
        <Card.Text className='stars'>
          ⭐{student.countingStar}
        </Card.Text>
        <Card.Text className='card-title'>
          {student.studentName}
        </Card.Text>
        <Card.Text>
          {student.room.roomGrade}학년 {student.room.roomNum}반
        </Card.Text>
      </div>
    </Box>
  );
};

export default CardFront;

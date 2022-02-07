import React, { useEffect } from 'react';
import { Button, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const Main1 = () => {
  return (
    <div className='Main1'>
      <Heading className='typing'>we are teaching master...</Heading>
      <div className='btn_box'>
        <Link to="/class/student/login" > <Button >학생 페이지</Button> </Link>
        <Link to="/login" ><Button>선생님페이지</Button></Link>
      </div>
    </div>
  )
};

export default Main1;

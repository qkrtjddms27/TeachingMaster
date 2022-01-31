import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

const QuizBar = ({quiz}) => {
  return (
  <Box className='quizbox'>
    <div className='empty'/>
    <Box className='title'>⭐즐겨찾기</Box>
    {quiz.length?
      <ul className='quizlist'>
        {quiz.map(Aquiz=><p key={Aquiz.quizId}>{Aquiz.quizTitle}</p>)}
      </ul>: 
      <Text>즐겨찾기한 퀴즈가 없습니다.</Text>}  
  </Box>)
};

export default QuizBar;

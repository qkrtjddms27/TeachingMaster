import React from 'react';
import { Box } from '@chakra-ui/react';
const QuizBar = ({id}) => {
  return (
  <Box className='quizbox' boxShadow="xl">
    <div className='empty'></div>
    <Box className='title'>⭐즐겨찾기</Box>
    <ul className='quizlist'>
      <p>1. 세종대왕의 이름은</p>
      <p>2. 을지문덕의 이름은</p>
      <p>3. 너의 이름은</p>
      <p>4. 그녀의 이름은</p>
    </ul>
  </Box>)

};

export default QuizBar;

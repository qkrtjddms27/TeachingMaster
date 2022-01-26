import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import '../scss/modal.scss'

const Modalquiz = ({change,student,onClose}) => {
  const [quizzes,setQuizzes] = useState([])

  return (
  <div className='student_quiz_page'>
    {student.name}의  퀴즈목록 출력
    <Button onClick={()=>change("main")}>뒤로</Button>
  </div>);
};

export default Modalquiz;

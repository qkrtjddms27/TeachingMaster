import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import '../scss/modal.scss'
import axios from 'axios';
import { serverUrl, setToken } from '../../../components/TOKEN';

const Modalquiz = ({change, student, onClose}) => {
  const [quizzes, setQuizzes] = useState([])

  // 퀴즈 로그 get
  useEffect(()=>{
    axios({
      url: `${serverUrl}/student/select/quiz_log/${student.studentId}`,
      method: 'GET',
      headers: setToken()
    })
    .then(({data}) => {
      console.log(data)
      setQuizzes(data)
    })
    .catch(err => console.log('get memo list err:', err))
  }, [])
  return (
  <div className='student_quiz_page'>
    <span>{student.name}의  퀴즈목록 출력</span>
    {quizzes.map((quiz, idx) => 
      <div key={idx}>{quiz.quizContents}</div>
    )}
    <Button onClick={()=>change("main")}>뒤로</Button>
  </div>);
};

export default Modalquiz;

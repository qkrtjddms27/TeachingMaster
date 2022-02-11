import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

const Timer = ({ quiz,setOX,setModalForm }) => {
  const [sec, setSec] = useState( quiz ===undefined ? 5 :  quiz.quizTimeout)
  const time = useRef( quiz ===undefined ? 5 :  quiz.quizTimeout)
  const timerId = useRef(null)
  
  const axiosMyQuiz = (choice) => {         // 퀴즈 제출
    console.log(`quizId: ${quiz.quizId}`)
    console.log(`choice: ${choice}`)
    sessionStorage.setItem('studentResult', quiz.quizAnswer === Number(choice))
    sessionStorage.setItem('quizId', quiz.quizId)
    
    setOX(quiz.quizAnswer === Number(choice) ? "O":"X")
    setModalForm('result')
  }
  useEffect(() => {
    timerId.current = setInterval(() => {
      setSec(time.current)
      time.current -= 1
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])

  useEffect(() => {
    if (time.current < 0) {           // 만약 타임 아웃이 발생했을 경우
      axiosMyQuiz(localStorage.getItem("thisone"))
      clearInterval(timerId.current)
    }
  }, [sec])

  return (
    <div className='quiz-timer'>
      <CircularProgress value={quiz.quizTimeout} color='orange' isIndeterminate>
        <CircularProgressLabel>{sec < 10 ? `0${sec}` : sec}초</CircularProgressLabel>
      </CircularProgress>
    </div>
  );
};

export default Timer;
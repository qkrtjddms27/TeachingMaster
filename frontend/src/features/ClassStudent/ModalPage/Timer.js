import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

const Timer = ({ quizTime, axiosMyQuiz }) => {
  const [sec, setSec] = useState(quizTime)
  const time = useRef(quizTime)
  const timerId = useRef(null)

  useEffect(() => {
    timerId.current = setInterval(() => {
      setSec(time.current)
      time.current -= 1
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])

  useEffect(() => {
    if (time.current < 0) {           // 만약 타임 아웃이 발생했을 경우
      axiosMyQuiz()
      clearInterval(timerId.current)
    }
  }, [sec])

  return (
    <div className='quiz-timer'>
      <CircularProgress value={quizTime} color='orange' isIndeterminate>
        <CircularProgressLabel>{sec < 10 ? `0${sec}` : sec}초</CircularProgressLabel>
      </CircularProgress>
    </div>
  );
};

export default Timer;
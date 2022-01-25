import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import axios from 'axios';
const QuizBar = ({id}) => {
  const [quiz,setQuiz] =useState([{quizId:3,quizTitle:""},{quizId:4,quizTitle:"어어어"}])
  useEffect(()=>{
    const userId = localStorage.getItem("userId")
    axios({
      url:`http://localhost:8080/api/v1/quiz/select/favor/${userId}`,
      method:"GET",
    })
    .then(res=>{
      setQuiz(res.data)
    })
    .catch(res=>{
      setQuiz({quizId:0,quizTitle:"즐겨찾기 퀴즈가 없습니다."})
    })
  },[])
  return (
  <Box className='quizbox'>
    <div className='empty'/>
    <Box className='title'>⭐즐겨찾기</Box>
    <ul className='quizlist'>
      {quiz.map(Aquiz=><p key={Aquiz.quizId}>{Aquiz.quizTitle}</p>)}
      {quiz.map(Aquiz=><p key={Aquiz.quizId}>{Aquiz.quizTitle}</p>)}
      {quiz.map(Aquiz=><p key={Aquiz.quizId}>{Aquiz.quizTitle}</p>)}
      {quiz.map(Aquiz=><p key={Aquiz.quizId}>{Aquiz.quizTitle}</p>)}
      {quiz.map(Aquiz=><p key={Aquiz.quizId}>{Aquiz.quizTitle}</p>)}
      {quiz.map(Aquiz=><p key={Aquiz.quizId}>{Aquiz.quizTitle}</p>)}
      {quiz.map(Aquiz=><p key={Aquiz.quizId}>{Aquiz.quizTitle}</p>)}
    </ul>
  </Box>)

};

export default QuizBar;

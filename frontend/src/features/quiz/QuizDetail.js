import React,{useState,useEffect} from 'react'
import { quizzes } from './quizzes'
import { Link, useParams } from 'react-router-dom'
import { Button, Heading } from '@chakra-ui/react'
import { choices } from './quizzes'
import './Quiz.scss'

const QuizDetail = () => {
  let {id} = useParams()
  const [quiz,setQuiz]  = useState({id:1})
  const [choice,setChoice] = useState({id:1,answer:[]})
  const url = `/quiz/${quiz.id}/update`
  useEffect(()=>{
    setQuiz(quizzes.filter(quiz=>quiz.id===Number(id))[0])
    setChoice(choices.filter(choice=>choice.id===quiz.id)[0])
  },[quiz,id])
  return (
    <div>
      <Heading>제목 : {quiz.title}</Heading>
      <p>문제번호 : {quiz.id}</p>
      <p>과목 : {quiz.subject}</p>
      <p>내용 : {quiz.content}</p>
      <p>{quiz.grade}학년 문제</p>
      <br></br>
      <p>보기</p>
      <p>정답: {quiz.answer}</p>
      {choice.answer.map((cho,i) =>{
        if(cho===true){cho="O"}
        else if(cho===false){cho="X"}
        return(
        <div key={i} className={i===quiz.answer?"correct":""}>
          {i+1}. {cho?cho:"X"}
        </div>
        )})}
        <Button><Link to={url}>수정하기</Link></Button>
    </div>
  )
}

export default QuizDetail

import React,{useState,useEffect} from 'react'
import { quizzes } from './quizzes'
import { Link, useParams } from 'react-router-dom'
import { Button, Heading, Input, Textarea } from '@chakra-ui/react'
import { choices } from './quizzes'
import './Quiz.scss'

const QuizUpdate = () => {
  let {id} = useParams()
  const [quiz,setQuiz]  = useState({id:1})
  const [choice,setChoice] = useState({id:1,answer:[]})
  const url = `/quiz/${quiz.id}/update`
  useEffect(()=>{
    setQuiz(quizzes.filter(quiz=>quiz.id===Number(id))[0])
    setChoice(choices.filter(choice=>choice.id===quiz.id)[0])
  },[quiz,id])
  return (
    <div className='quiz-update-page'>

        <Heading>수정페이지</Heading>
        <Heading className='title'>제목 :</Heading>
        <Input variant='filled' value={quiz.title} className='input_title' placeholder={quiz.title}/>
        <p>문제번호 : {quiz.id}(수정불가)</p> 
        <p>과목 : {quiz.subject}(인풋창)</p>
        <p>내용 : </p>
        <Textarea className='input_content' placeholder={quiz.content}/>
        <p>{quiz.grade}학년 문제(인풋창)</p>
        <br></br>
        <Heading>보기</Heading>
        정답바꾸기도 추가
        {choice.answer.map((cho,i) =>{
          if(cho===true){cho="O"}
          else if(cho===false){cho="X"}
          return(
          <div className='choices'>
            {i+1}.
            <input key={i} className={i===quiz.answer?"correct":"wrong"}
              placeholder={cho?cho:"X"}
          /></div>
        )})}
    </div>
  )
}

export default QuizUpdate
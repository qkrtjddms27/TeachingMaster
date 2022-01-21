import { Button, Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const EachQuiz = ({quiz}) => {
  const url = `/quiz/${quiz.id}`
  return (
    <div>
      <Heading size="md">{quiz.id}번 문제</Heading>
        <p>과목 : {quiz.subject}</p>
        <p>제목 : {quiz.title}</p>
        <p>내용 : {quiz.content}</p>
        <p>{quiz.grade}학년 문제</p>
        <p>정답 :{quiz.answer}번 </p>
        <Button colorScheme="blue">
          <Link to={url}>상세보기</Link>
        </Button>
        <hr/>
    </div>
  )
}

export default EachQuiz

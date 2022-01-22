import { Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import EachQuiz from './EachQuiz'
import { folders } from './quizzes'
import { quizzes } from './quizzes'

const InFolder = () => {
  let {id} = useParams()
  const [folder,setfolder] = useState({})
  const [quizlist,setQuizlist]  = useState([])
  useEffect(()=>{
    setfolder(folders.filter(folder=>folder.id===Number(id))[0])
    setQuizlist(quizzes.filter(quiz =>quiz.folder_id===Number(id)))
  },[id])
  return (
    <div>
      <Heading>{folder.id}번 폴더</Heading>
      <Heading>폴더이름 : {folder.title}</Heading>
      <Heading>퀴즈 목록</Heading>
      <hr/>
      {quizlist.map(quiz=>{ 
        return(<EachQuiz key={quiz.id} quiz={quiz}/>)
      })}
    </div>
  )
}

export default InFolder

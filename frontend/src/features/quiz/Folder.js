import React from 'react'
import { quizzes } from './quizzes'
import { choice } from './quizzes'
import { folders } from './quizzes'
import  {Heading} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const Folder = () => {
  return (
    <div className='quiz_name'>
      {folders.map((folder)=>{
      const url = `/quiz/folder/${folder.id}`;
      return (
        <Heading key={folder.id}>
          <Link to={url}>
            {folder.title}
          </Link>
        </Heading>)})}
    </div>
  )
}

export default Folder

import { folders } from './quizzes'
import  {Heading} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Folder = () => {
  return (
    <div>
      <Heading>폴더목록</Heading>
      <hr/>
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
    </div>
  )
}

export default Folder

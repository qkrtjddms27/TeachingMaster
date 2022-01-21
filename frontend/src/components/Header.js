import {useState} from 'react'
import { Box } from '@chakra-ui/react'
import './Header.scss'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
const Header = () => {
  const [iflogin,setIflogin] =useState(false)
  return (
    <div>
      <Box className='header-box' 
      w='100%' p={4} color='white'>
        <Sidebar className='header-left'/>
        <Link className='header-title' to ="/">
          Teaching Master
        </Link>  
        <div className='header-right'>
          {iflogin? <div>로그아웃</div>:
            <div>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </div>}
        </div>
      </Box>    
    </div>
  )
}

export default Header

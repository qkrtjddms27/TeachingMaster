import {useState,useEffect} from 'react'
import { Box } from '@chakra-ui/react'
import '../scss/Header.scss'
import Sidebar from './Sidebar'
import { Link, useHistory } from 'react-router-dom'

const Header = ({isLogin,setisLogin,user,setUser}) => {
  useEffect(()=>{
    const isUser = JSON.parse(localStorage.getItem("user"))
    if (isUser){setisLogin(true)}
    setUser(JSON.parse(localStorage.getItem("user")))
  },[])
  const history = useHistory()
  const logout = ()=>{
    localStorage.clear()
    setUser("")
    setisLogin(false)
    history.push('/')
  }
  return (
    <div>
      <Box className='header-box' 
      w='100%'  color='white'>
        {isLogin && <Sidebar user={user} setUser={setUser} className='header-left'/>}
        <Link className='header-title' to ="/">
          Teaching Master
        </Link>  
        <div className='header-right'>
          {isLogin? <Link to="/" onClick={logout}>로그아웃</Link>:
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

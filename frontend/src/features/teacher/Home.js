import React,{useState,useEffect} from 'react'
import { Box,  Heading} from '@chakra-ui/react'
import './scss/Home.scss'
import QuizBar from './QuizBar'
import AOS from 'aos'
import "aos/dist/aos.css"
import axios from 'axios'
import { setToken, serverUrl } from '../../components/TOKEN'

// 유저정보에서 선생님 사진 받아오기
const Home = ({user,setUser}) => {
  const [quiz,setQuiz] =useState([])
  useEffect(()=>{
    AOS.init()
  },[])

  useEffect(()=>{
    const userId = localStorage.getItem("userId")
    axios({
      url:`${serverUrl}/v1/quiz/select/favor/${userId}`,
      method:"GET",
      headers:setToken(),
    })
    .then(res=>{
      setQuiz(res.data)
      setUser(JSON.parse(localStorage.getItem("user")))
    })
    .catch(err=>{
      console.log("홈 문제받기 에러")
      console.log(err)
    })
  },[])

  
  const [classTitle,setClassTitle] = useState("🎈 행복이 가득한")
  const [class_open,setClass_open] =useState(true)
  const openClass = ()=>{
    setClass_open(!class_open)
  }
  return (
    <div>
      <div className='class-box'>
        {/* 껍데기 */}
        <Box className='teacher-box' data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-easing="line">
            {/* 선생님 페이지 */}
            <Heading className='classTitle'>{classTitle}</Heading>
            <Heading className='grade-class'>{user.roomGrade}학년 {user.roomNum}반</Heading>
            <div className='teacher'>
              <div className='image-box'>
                <img className='image' alt='선생님사진'
                src="https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg" />
              </div>
              <Heading className='name' >{user.userName} 선생님</Heading> 
            </div>
            {class_open?
            <div className='when-open'>
              <Box className='class-enter' >교실 입장</Box>
              <Box className='class-close' onClick={openClass} >교실 닫기</Box>
            </div>:
            <div className='when-close'>
              <Box className='class-open' onClick={openClass}>교실 열기</Box>
            </div>}
          </Box>
        <div data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-easing="line">
              <QuizBar quiz={quiz} className='quizbar' userId={user.userId} user={user}/>      
        </div>
        
      </div>
      </div>
  )
}
export default Home

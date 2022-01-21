import React,{useState} from 'react'
import {Avatar, Box, Button, Heading} from '@chakra-ui/react'
import './Home.scss'
import QuizBar from './QuizBar'

// 유저정보에서 선생님 사진 받아오기
const Home = () => {
  const [teacher,setTeacher] = useState({
    id:1,
    name:"이주빈",
    teacher_profile:"https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg",
    class_open:true,
    grade : 3,
    class : 5
  })
  const [classTitle,setClassTitle] = useState("🎈 행복이 가득한")
  const openClass = ()=>{
    setTeacher({...teacher,class_open:!teacher.class_open})
  }
  return (
      <div className='class-box'>
        {/* 껍데기 */}
        <Box className='teacher-box'  boxShadow="xl">
          {/* 선생님 페이지 */}
          <Heading className='classTitle'>{classTitle}</Heading>
          <Heading className='grade-class'>{teacher.grade}학년 {teacher.class}반</Heading>
          <div className='teacher'>
            <div className='image-box'>
              <img className='image' alt='선생님사진'
              src={teacher.teacher_profile} />
            </div>
            {/* <Avatar boxShadow="xl" className='image' src={teacher.teacher_profile} /> */}
            <Heading className='name' >{teacher.name} 선생님</Heading> 
          </div>
          {teacher.class_open?
          <div className='when-open'>
            <Box className='class-enter' >교실 입장</Box>
            <Box className='class-close' onClick={openClass} >교실 닫기</Box>
          </div>:
          <div className='when-close'>
            <Box className='class-open' onClick={openClass}>교실 열기</Box>
          </div>}
        </Box>
        <QuizBar className='quizbar' id={teacher.id}/>
      </div>
  )
}
export default Home

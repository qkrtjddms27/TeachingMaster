import React,{useState} from 'react'
import {Avatar, Button, Heading} from '@chakra-ui/react'
import './Home.scss'

// 유저정보에서 선생님 사진 받아오기
const Home = () => {
  const [teacher,setTeacher] = useState({
    name:"이주빈",
    teacher_profile:"https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg",
    class_open:true
  })
  const [classTitle,setClassTitle] = useState("행복이 가득한 1학년 1반😘")
  const openClass = ()=>{
    setTeacher({...teacher,class_open:!teacher.class_open})
  }
  return (
      <div className='class-box'>
        <div className='teacher-box'>
          <Heading className='classTitle'>{classTitle}</Heading>

          <div className='teacher'>
            <Avatar className='image' size="2xl" src={teacher.teacher_profile} />
            <Heading className='name' >{teacher.name} 선생님</Heading> 
          </div>
          
          {teacher.class_open? 
          <div>
            <Button colorScheme="whatsapp">교실입장</Button>
            <Button colorScheme="pink" onClick={openClass}>교실닫기</Button>
          </div>:
          <div>
            <Button colorScheme="orange" onClick={openClass}>교실열기</Button>
          </div>
          }  
        </div>
      </div>
  )
}
export default Home

import React,{useState} from 'react'
import UserVideoComponent from '../openVidu/UserVideoComponent'
import { useEffect } from 'react';

const StudentScreen = ({who,speakingStudents,streamManager}) => {
  const [isSpeaking,setIsSpeaking] = useState(false)
  const [student, setStudent] = useState(JSON.parse(streamManager.stream.connection.data))

  useEffect(()=>{
    console.log("⭐⭐⭐⭐⭐⭐⭐","이스스피킹")
    const isIn = speakingStudents.includes(student.studentId)
    if (isIn){setIsSpeaking(true)}
    else{setIsSpeaking(false)}
  },[speakingStudents])
  
  return (
    <div>
      <UserVideoComponent 
        who={who}
        isSpeaking = {isSpeaking}
        streamManager={streamManager} />
    </div>
  )
}

export default StudentScreen
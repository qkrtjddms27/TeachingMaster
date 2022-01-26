import React,{useEffect,useState} from 'react'
import StudentCard from './Card'
import './scss/student.scss'
import { Col, Row } from 'react-bootstrap'
import AOS from 'aos'
import "aos/dist/aos.css"
import axios from 'axios'
import { setToken } from '../../components/TOKEN'
import { Button, Select } from '@chakra-ui/react'

const EveryStudent = () => {
  const [students,setStudents] = useState([])
  const [everyStudent,setEveryStudent] =useState([])
  useEffect(()=>{
    AOS.init()
    axios({
      url:"http://localhost:8080/api/student/studentAll",
      method:"POST",
      headers:setToken()
    })
    .then(res=>{
      setStudents(res.data.students)
      setEveryStudent(res.data.students)
    })
    .catch(res=>{
      alert("정보를 찾을 수 없습니다.")
    })
  },[])
  const user = JSON.parse(localStorage.getItem('user'))
  const [grade, setGrade] = useState('all')
  const [room ,setRoom] = useState('all')
  useEffect(() => {
    if (grade === 'all') {  // 학년이 전체라면 ?
      if (room === 'all') { // 반이 전체일 경우?
        setStudents(everyStudent) //[ 학년전체& 반전체] 그대로 둔다 
      } 
      else {  //[학년전체& N반] 반을 골랐을 경우 현재 students에서 반이 내가 고른거랑 같은거만 거른다
        setStudents(everyStudent.filter(student => student.room.roomNum === Number(room)))
      }
    } 
    else {  
      if (room === 'all') { // [ N학년& 전체반]
        setStudents(everyStudent.filter(student => student.room.roomGrade === Number(grade)))
      } else { //[ N학년 & N반]
        setStudents(everyStudent.filter(student => student.room.roomGrade === Number(grade) && student.room.roomNum === Number(room)))
      }
    }
  }, [room, grade])

  return (
    <div className='card-case'>
      <div className='grade_room_box'>
        <div className='grade_select'>
          <p className='grade-text' onClick={() =>{setRoom('all'); setGrade('all')}}><span className='line'>전체</span></p>
          <p className='grade-text' onClick={() => setGrade(1)}><span className='line'>1학년</span></p>
          <p className='grade-text' onClick={() => setGrade(2)}><span className='line'>2학년</span></p>
          <p className='grade-text' onClick={() => setGrade(3)}><span className='line'>3학년</span></p>
          <p className='grade-text' onClick={() => setGrade(4)}><span className='line'>4학년</span></p>
          <p className='grade-text' onClick={() => setGrade(5)}><span className='line'>5학년</span></p>
          <p className='grade-text' onClick={() => setGrade(6)}><span className='line'>6학년</span></p>
        </div>
          {grade==='all'?
          <Button id={room} onClick={()=>{setRoom(user.roomNum);setGrade(user.roomGrade)}} color="white" colorScheme="cyan" className='myroom_select'> 우리반보기 </Button>:
          <Button id={room} onClick={()=>{setRoom(user.roomNum);setGrade(user.roomGrade)}} color="white" colorScheme="cyan" className='myroom_select2'> 우리반보기 </Button>}          {grade!=='all'&&
          <div className='room_select'>
            <Select onChange={(e) => setRoom(e.target.value)}>
              <option value='all'>전체</option>
              <option value='1'>1반</option>
              <option value='2'>2반</option>
              <option value='3'>3반</option>
              <option value='4'>4반</option>
              <option value='5'>5반</option>
              <option value='6'>6반</option>
            </Select>
          </div>
          }
        </div>

      <div className='cards' data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-easing="line">
        <Row className='row'>
          {students.map(student=>{
            return (
              <Col md={6} lg={4} xxl={3} key={student.studentId}>
                <StudentCard  className="card" Astudent={student}  />
              </Col>
            )})}  
        </Row>
      </div>
    </div>
  )
}

export default EveryStudent

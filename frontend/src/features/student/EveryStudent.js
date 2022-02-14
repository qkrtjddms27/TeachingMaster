import React,{useEffect,useState} from 'react'
import StudentCard from './Card'
import './scss/student.scss'
import './scss/spinner.scss'
import { Col, Row } from 'react-bootstrap'
import AOS from 'aos'
import "aos/dist/aos.css"
import axios from 'axios'
import { setToken, serverUrl } from '../../components/TOKEN'
import { Button,  Select } from '@chakra-ui/react'

const EveryStudent = () => {
  const [students,setStudents] = useState([])
  const [everyStudent,setEveryStudent] =useState([])
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    AOS.init()
    const fetchData = async()=>{
    setLoading(true)
    const options = {
      methods: "get",
      url : `${serverUrl}/student/studentAll`,
      headers: setToken()
    }
    try{
      const response = await axios(options)
      setStudents(response.data.students)
      setEveryStudent(response.data.students)
      // console.log(response.data.students)
    }catch(e){
      console.log(e)
    }
    setLoading(false)
  }
  fetchData()},[])

  const user = JSON.parse(localStorage.getItem('user'))
  const [grade, setGrade] = useState('all')
  const [room ,setRoom] = useState('all')
  useEffect(() => {
    if (grade === 'all') {  // 학년이 전체라면 ?
      if (room === 'all') { // 반이 전체일 경우?
        setStudents(everyStudent) // [학년전체& 반전체] 그대로 둔다 
      } 
      else {  // [학년전체& N반] 반을 골랐을 경우 현재 students에서 반이 내가 고른거랑 같은거만 거른다
        setStudents(everyStudent.filter(student => student.room.roomNum === Number(room)))
      }
    } 
    else {  
      if (room === 'all') { // [ N학년& 전체반]
        setStudents(everyStudent.filter(student => student.room.roomGrade === grade))
      } else { //[ N학년 & N반]
        setStudents(everyStudent.filter(student => student.room.roomGrade === grade && student.room.roomNum === Number(room)))
      }
    }
  }, [room, grade])

  if (loading) {
    return ( 
      <div className='card-case'>
        <div className='Spinner'>
        <div className="mul13">
          <div className="m13s m13c1"></div>
          <div className="m13s m13c2"></div>
        </div>
        </div>    
      </div>
    )
  }

  return (
    <div className='card-case'>
      <div className='grade_room_box'>
        <div className='grade_select'>
          <p className='grade-text' id={grade === 'all' ? 'on-grade' : ''} onClick={() =>{setRoom('all'); setGrade('all')}}><span className='line'>전체</span></p>
          {[1, 2, 3, 4, 5, 6].map(v => 
          <p key={v} className='grade-text' id={grade === v ? 'on-grade' : ''} onClick={() => setGrade(v)}><span className='line'>{v}학년</span></p>
          )}
        </div>
          {grade ==='all' ?
          <Button id={room} onClick={()=>{setRoom(user.roomNum);setGrade(user.roomGrade)}} color="white" colorScheme="cyan" className='myroom_select'> 우리반보기 </Button>
          :
          <Button id={room} onClick={()=>{setRoom(user.roomNum);setGrade(user.roomGrade)}} color="white" colorScheme="cyan" className='myroom_select2'> 우리반보기 </Button>}
          {grade !== 'all' && 
          <div className='room_select'>
            <Select onChange={(e) => setRoom(e.target.value)} value={room}>
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
      <br/>
      <br/>
    </div>
  )}


export default EveryStudent

import React,{useEffect} from 'react'
import {students} from './students'
import StudentCard from './StudentCard'
import './student.scss'
import { Col, Row } from 'react-bootstrap'
import AOS from 'aos'
import "aos/dist/aos.css"
import axios from 'axios'
const EveryStudent = () => {
  useEffect(()=>{
    AOS.init()
    axios({
      url:"http://localhost:8080/api/v1/users/me",
      method:"GET",
    })
    .then(res=>{
      console.log(res)
    })
    .catch(res=>{
      alert("정보를 찾을 수 없습니다.")
    })
  },[])
  
  return (
    <div className='card-case'>
      <div className='cards' data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-easing="ease-in">
        <Row className='row'>
          {students.map(student=>{
            return (
              <Col md={6} lg={4} xxl={3} key={student.id}>
                <StudentCard  className="card" student={student}  />
              </Col>
            )})}  
        </Row>
      </div>
    </div>
  )
}

export default EveryStudent

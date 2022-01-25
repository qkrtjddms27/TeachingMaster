import React,{useEffect} from 'react'
import {students} from './students'
import StudentCard from './StudentCard'
import './student.scss'
import { Col, Row } from 'react-bootstrap'
import AOS from 'aos'
import "aos/dist/aos.css"

const EveryStudent = () => {
  useEffect(()=>{
    AOS.init()
  })
  
  return (
    <div className='card-case'>
      <div className='cards' data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-easing="ease-in">
        <Row className='row'>
          {students.map(student=>{
            return (
              <Col md={6} lg={3} xxl={3} key={student.id}>
                <StudentCard  className="card" student={student}  />
              </Col>
            )})}  
        </Row>
      </div>
    </div>
  )
}

export default EveryStudent

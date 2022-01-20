import React from 'react'
import {students} from './students'
import StudentCard from './StudentCard'
import { Col, Row } from 'react-bootstrap'
import './student.scss'
const Student = () => {
  return (
    <div className='cards'>
      <Row md={2} lg={4} className='g-4'>
        {students.map(student=>{
          return (
          <Col>
            <StudentCard student={student} />
          </Col>)})}  
      </Row>
    </div>
  )
}

export default Student

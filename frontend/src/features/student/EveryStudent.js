import React from 'react'
import {students} from './students'
import StudentCard from './StudentCard'
import './student.scss'
import { Col, Row } from 'react-bootstrap'
const EveryStudent = () => {
  return (
    <div className='card-case'>
      <div className='cards'>
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

import React from 'react'
import {students} from './students'
import StudentCard from './StudentCard'
import { Box } from '@chakra-ui/react'

import './student.scss'
import { Col, Row } from 'react-bootstrap'
const Student = () => {
  return (
    <div className='card-case'>
      <div className='cards'>
        <Row className='row'>
          {students.map(student=>{
            return (
              <Col md={6} lg={4} xl={3} key={student.id}>
                <StudentCard  className="card" student={student}  />
              </Col>
            )})}  
        </Row>
      </div>
    </div>
  )
}

export default Student

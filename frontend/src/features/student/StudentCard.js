import { Heading,Text,Avatar } from '@chakra-ui/react'
import React from 'react'
import { Card,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const StudentCard = ({student}) => {
  return (
    <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src={student.profile} /> */}
      <Avatar size="xl" name='Dan Abrahmov' src={student.profile} />
      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>
        ⭐{student.star}
        </Card.Text>
        <Button variant="warning">
          <Link to="/"> 학생정보</Link>
          </Button>
      </Card.Body>
    </Card>
  )
}

export default StudentCard

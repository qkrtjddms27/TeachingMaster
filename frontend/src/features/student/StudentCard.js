import { Box,Text } from '@chakra-ui/react'
import React from 'react'
import { Card } from 'react-bootstrap'
const StudentCard = ({student}) => {
  return (
    <Card className='CARD'>
      <Box className='f-cardbox' boxShadow="xl">
        <img className='image' alt='학생사진' 
          src={student.profile} />
        <div className='card-body'>
          <Card.Title className='card-title'>
              {student.name}
          </Card.Title>
          <Card.Text className='stars'>
          ⭐&nbsp;{student.star}
          </Card.Text>
        </div>
      </Box>
    
      <Box className='b-cardbox' id ={student.id%2===0?"odd":"even"} boxShadow="xl">
        <div className='img-name-star'>
          <img className='image' alt='학생사진' src={student.profile} />
          <div>
            <div className='card-title'>{student.name}</div>
            <div className='stars'>⭐&nbsp;{student.star}</div>
          </div>
        </div>
        <div className='contents'>
          <p>누적 ⭐&nbsp;{student.star*2}</p>
          <p>메일주소&nbsp; {student.email}</p>
          <p>연락처&nbsp; {student.phone}</p>
        </div>

        <ul className='memo'>
          <Text className='memotitle'>메모</Text>
            <li>우리반 반장</li>
            <li>선생님을 잘 따른다</li>
            <li>지난 기말고사 1등</li>
        </ul>
        
      </Box>
    </Card>
  )
}

export default StudentCard

import { Box,Text,useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { Card } from 'react-bootstrap'
import ModalPage from './ModalPage'

const StudentCard = ({student}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Card className='CARD'  >
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
      
        <Box onClick={onOpen} className='b-cardbox' id ={student.id%2===0?"odd":"even"} boxShadow="xl">
          <div className='img-name-star'>
            <img className='image' alt='학생사진' src={student.profile} />
            <div>
              <div className='card-title'>{student.name}</div>
              <div className='stars'>⭐&nbsp;{student.star}</div>
            </div>
          </div>

          <div className='memo'>
              <Text className='stars'>누적⭐&nbsp;{student.star*2}</Text>
              <Text className='memo-title'>메모</Text>
              <Text className='memo-content'>우리반 반장</Text>
              <Text className='memo-content'>선생님을 잘 따른다</Text>
              <Text className='memo-content'>지난 기말고사 1등</Text>
          </div>
          
        </Box>
      </Card>
      <ModalPage 
      student={student} isOpen={isOpen} onOpen={onOpen} onClose={onClose} 
      />
    </>
  )
}

export default StudentCard

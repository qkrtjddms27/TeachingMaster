import { useDisclosure } from '@chakra-ui/react'
import React,{useState} from 'react'
import { Card } from 'react-bootstrap'
import CardBack from './CardBack'
import CardFront from './CardFront'
import ModalPage from './ModalPage/ModalPage'

const StudentCard = ({Astudent}) => {
  const [student,setStudent] = useState(Astudent)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mainOrUpate,setMainOrUpdate] = useState("main")
  const Open = ()=>{
    setMainOrUpdate("main")
    onOpen()
  }

  return (
    <>
      <Card className='CARD'  >
        <CardFront student={student} />
        <CardBack onOpen={onOpen} student={student} />
      </Card>
      <ModalPage mainOrUpate={mainOrUpate} setMainOrUpdate={setMainOrUpdate}
      student={student} setStudent={setStudent} isOpen={isOpen} onOpen={Open} onClose={onClose} 
      />
    </>
  )
}

export default StudentCard

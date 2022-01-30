import { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image } from '@chakra-ui/react';
import '../scss/StudentModal.scss'
import dinosaur from '../image/퀴즈공룡.png'


const Sticker = ({ isOpen, onOpen, onClose }) => {
  const me = {
    "student_id": 3,
    "student_name": "새로운",
    "counting_star": 13,
    "student_score": 52,
  }

  const [nums, setNums] = useState([])
  useEffect(() => {
    setNums(Array(20).fill().map((v, i) => i))
  }, [])

  return (
    <>
      <Modal
        size="full"
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent bgColor='#B2CCC1' w='85rem' h='45rem' marginY='7rem' marginX='1rem' >
          <ModalHeader className='student-modal-header'>
            <span style={{"fontSize": "xx-large"}}>내 공룡은 {parseInt(me.student_score/20)}살!</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className='sticker-body'>
            <div className='sticker-left'>
              <Image className='big-dino' src={dinosaur} />
            </div>
            <div className='sticker-right'>
                {nums.map(num => {
                  const dinoUrl = `https://cdn-icons-png.flaticon.com/512/145/${145297+num}.png`
                  return (
                    <div key={num} className='sticker-mini'>
                      {num < (me.student_score%20) && 
                        <Image src={dinoUrl} className='mini-dino' 
                      />}
                    </div>
                  )
                })}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Sticker;
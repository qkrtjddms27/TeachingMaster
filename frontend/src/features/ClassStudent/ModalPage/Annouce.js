import {Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image, Button } from '@chakra-ui/react';
import '../scss/announce.scss'

const Announce = ({ isOpen, onOpen, onClose,setMic }) => {
  return (
    <>
      <Modal
        size="2xl"
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent bgColor='rgba(251, 251, 251, 0.883)' w='50rem' h="30rem"  >
          <ModalHeader className='student-modal-header'>
            <span style={{"fontSize": "xx-large"}}>발표시간!</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <div className='announce_body'>
              <p>발표 차례에요</p>
              <p>마이크를 켜주세요</p>
              <div className='announce_btn' onClick={()=>
                {setMic(true)
                onClose()
                }
                }>발표하기</div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Announce;
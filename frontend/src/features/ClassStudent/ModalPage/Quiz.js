import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image } from '@chakra-ui/react';
import '../scss/StudentModal.scss'

const Quiz = ({ isOpen, onOpen, onClose }) => {
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
            <span style={{"fontSize": "xx-large"}}>퀴즈 타임</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className='sticker-body'>
            <div></div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Quiz;
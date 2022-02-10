import {Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image, Button } from '@chakra-ui/react';
import '../scss/announce.scss'

const Announce = ({ isOpen, onOpen, onClose, }) => {
  return (
    <ModalContent bgColor='rgba(251, 251, 251, 0.883)' w='50rem' h="30rem" marginY='15rem' >
      <ModalCloseButton />
      <ModalBody >
        <div className='announce_body'>
          <p>발표 차례에요 😀</p>
          <p>마이크를 켜주세요🎙</p>
          <div className='announce_btn' onClick={()=>
            {onClose();}}
          >발표하기</div>
        </div>
      </ModalBody>
    </ModalContent>
  );
};

export default Announce;
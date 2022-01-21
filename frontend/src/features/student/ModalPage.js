import { useState } from 'react';
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,Button } from '@chakra-ui/react';
import './modal.scss'
import ModalUpdate from './ModalUpdate';
import ModalMain from './ModalMain'
const ModalPage = ({isOpen, onOpen, onClose,student}) => {
  const [mainOrUpate,setMainOrUpdate] = useState("main")
  return (
    <div className='ModalPage'>
      <Modal
        size="5xl"
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent 
          w='60rem'
          h='40rem'
          className='Modalbox'>
            <ModalHeader className='title'>학생정보</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className='body'>
                {mainOrUpate==="main"?
                  <ModalMain change={setMainOrUpdate} onClose={onClose} student={student}/>:
                  <ModalUpdate change={setMainOrUpdate} onClose={onClose} student={student} />
                }       
              </div>              
          </ModalBody>
        </ModalContent>
      </Modal>
      
    </div>
  );
};

export default ModalPage;

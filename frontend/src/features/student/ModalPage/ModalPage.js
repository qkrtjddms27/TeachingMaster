import { useState } from 'react';
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody } from '@chakra-ui/react';
import '../scss/modal.scss'
import ModalUpdate from './Update';
import ModalMain from './Main'
import Modalquiz from './Quiz';
const ModalPage = ({isOpen, onOpen, onClose,student,mainOrUpate,setMainOrUpdate,setStudent}) => {
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
                {mainOrUpate==="main" && <ModalMain change={setMainOrUpdate} onClose={onClose} student={student}/>}
                {mainOrUpate==="update" && <ModalUpdate setStudent={setStudent} change={setMainOrUpdate} onClose={onClose} student={student} /> }  
                {mainOrUpate==="quiz" && <Modalquiz change={setMainOrUpdate} onClose={onClose} student={student}/>}       
              </div>              
          </ModalBody>
        </ModalContent>
      </Modal>
      
    </div>
  );
};

export default ModalPage;

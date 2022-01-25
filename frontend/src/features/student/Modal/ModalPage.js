import { useState } from 'react';
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody } from '@chakra-ui/react';
import './modal.scss'
import ModalUpdate from './ModalUpdate';
import ModalMain from './ModalMain'
import Modalquiz from './Modalquiz';
const ModalPage = ({isOpen, onOpen, onClose,student,mainOrUpate,setMainOrUpdate}) => {
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
                {mainOrUpate==="update" && <ModalUpdate change={setMainOrUpdate} onClose={onClose} student={student} /> }  
                {mainOrUpate==="quiz" && <Modalquiz change={setMainOrUpdate} onClose={onClose} student={student}/>}       
              </div>              
          </ModalBody>
        </ModalContent>
      </Modal>
      
    </div>
  );
};

export default ModalPage;

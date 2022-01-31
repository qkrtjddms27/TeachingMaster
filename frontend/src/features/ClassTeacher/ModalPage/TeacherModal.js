import { Modal, ModalOverlay } from '@chakra-ui/react';
import '../scss/TeacherModal.scss'
// import Quiz from './Quiz';
import { useState } from 'react';

const TeacherModal = ({ modalForm, setModalForm, isOpen, onOpen, onClose }) => {
  const [ox, setOX] = useState(false)
  return (
    <>
      {/* <Modal
        size="full"
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
        closeOnOverlayClick={modalForm !== 'quiz' && modalForm !== 'OX'}
      >
        <ModalOverlay />
        {modalForm === 'sticker' && <Sticker />}
        {modalForm === 'quiz' && <Quiz onClose={onClose} setModalForm={setModalForm} setOX={setOX}/>}
        {modalForm === 'OX' && <OX onClose={onClose} ox={ox}/>}
        {modalForm === 'announce' && <Announce onClose={onClose} />}
      </Modal> */}
    </>
  );
};

export default TeacherModal;
import { Modal, ModalOverlay } from '@chakra-ui/react';
import '../scss/StudentModal.scss'
import Sticker from './Sticker'
import Quiz from './Quiz';
import OX from './OX';
import Announce from './Announce';
import { useState } from 'react';

const StudentModal = ({ modalForm, setModalForm, isOpen, onOpen, onClose, setMic }) => {
  const [ox, setOX] = useState(false)
  return (
    <>
      <Modal
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
        {modalForm === 'announce' && <Announce onClose={onClose} setMic={setMic} />}
      </Modal>
    </>
  );
};

export default StudentModal;
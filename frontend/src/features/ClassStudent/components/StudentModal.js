import { Modal, ModalOverlay, Image, useDisclosure } from '@chakra-ui/react';
import '../scss/StudentModal.scss'
import { useState } from 'react';
import Sticker from './Sticker'
import Quiz from './Quiz';
import OX from './OX';
import Announce from './Announce';

const StudentModal = ({kind, iconAs, title,setState }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  const [modalForm, setModalForm] = useState(null)
  const modalOpen = (kind) => {
    setModalForm(kind)
    onOpen()
  }
  const [ox,setOX ] = useState(false)
  return (
    <>
      <button className='state_button' title={title}
        onClick={() => modalOpen(kind)}
      ><Image src={iconAs} height="100" /></button>
      <Modal
        size="full"
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
        closeOnOverlayClick={modalForm!=='quiz' && modalForm !=='OX'}
      >
        <ModalOverlay />
        {modalForm === 'sticker' && <Sticker onClose={onClose} />}
        {modalForm === 'quiz' && <Quiz onClose={onClose} setModalForm={setModalForm} setOX={setOX}/>}
        {modalForm === 'OX' && <OX ox={ox} onClose={onClose} />}
        {modalForm === 'announce' && <Announce setState={setState} onClose={onClose}/>}
      </Modal>
    </>
  );
};

export default StudentModal;
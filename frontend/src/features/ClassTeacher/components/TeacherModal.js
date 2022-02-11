import { Modal, ModalOverlay, Icon, useDisclosure, Image } from '@chakra-ui/react';
import { useState } from 'react';
import '../scss/TeacherModal.scss'
import BookmarkQuiz from './BookmarkQuiz';
import OxQuiz from './OxQuiz';

const TeacherModal = ({ kind, imgSrc, title, quizQ }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  const [modalForm, setModalForm] = useState(null)
  const modalOpen = (kind) => {
    setModalForm(kind)
    onOpen()
  }

  return (
    <>
      {/* <button className='OnOffButton' title={title}
        onClick={() => modalOpen(kind)}
      ><Icon as={iconAs} w={8} h={8} /></button> */}
      <Image src={imgSrc} className='OnOffButton' title={title}
        onClick={() => modalOpen(kind)} w={8} h={8} />
      <Modal
        size="full"
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        {modalForm === 'bookmark' && <BookmarkQuiz onClose = {onClose} quizQ = {quizQ} setModalForm={setModalForm}/>}
        {modalForm === 'ox' && <OxQuiz onClose = {onClose} quizQ = {quizQ} />}
      </Modal>
    </>
  );
};

export default TeacherModal;
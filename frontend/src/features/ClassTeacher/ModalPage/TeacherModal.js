import { Modal, ModalOverlay } from '@chakra-ui/react';
import '../scss/TeacherModal.scss'
import BookmarkQuiz from './BookmarkQuiz';
import OxQuiz from './OxQuiz';

const TeacherModal = ({ modalForm, setModalForm, isOpen, onOpen, onClose }) => {
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
        {modalForm === 'bookmark' && <BookmarkQuiz setModalForm={setModalForm}/>}
        {modalForm === 'ox' && <OxQuiz />}
        {/* {modalForm === 'OX' && <OX onClose={onClose} ox={ox}/>} */}
        {/* {modalForm === 'announce' && <Announce onClose={onClose} />} */}
      </Modal>
    </>
  );
};

export default TeacherModal;
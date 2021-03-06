import { Modal, ModalOverlay, Image } from '@chakra-ui/react';
import '../scss/StudentModal.scss'
import { useState, useEffect } from 'react';
import Sticker from './Sticker'
import Quiz from './Quiz';
import OxQuiz from './OxQuiz';
import QuizResult from './QuizResult';
import Announce from './Announce';
import Rolling from './Rolling';

const StudentModal = (
  {kind, iconAs, title, quizs, 
    resultQ, isOpen, onOpen, onClose, modalForm, mySession,student,
    setModalForm, modalOpen,pickone,studentsName }) => {
  const [ox,setOX ] = useState("")
  
  const sendresultHandle = ()=>{
    if (mySession !== undefined){
    mySession.signal({
      data: JSON.stringify({
        "studentId":student.studentId,
        "quizId":sessionStorage.getItem('quizId'),
        "studentResult": sessionStorage.getItem('studentResult'),
        "studentAnswer": localStorage.getItem("thisone")
      }),
      to: [],
      type: 'studentQuizresult',
    });
    sessionStorage.removeItem('studentResult');
  }}
  
  return (
    <>
      <button className='state_button' title={title}
        onClick={() => modalOpen(kind)}
      > {iconAs!=="" &&  <Image className='dino' src={iconAs}  /> }
      </button>
      <Modal
        size="full"
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
        closeOnOverlayClick={modalForm!=='quiz' && modalForm !=='OX' && modalForm !== 'oxQuiz'}
      >
        {/* <ModalOverlay  style={{"zIndex": '-1'}} /> */}
        <ModalOverlay  style={{"zIndex": '0'}} />
        {/* <ModalOverlay /> */}
        {modalForm === 'sticker' && <Sticker onClose={onClose} student={student} />}
        {modalForm === 'quiz' && <Quiz quizs = {quizs} onClose={onClose} setModalForm={setModalForm} setOX={setOX}/>}
        {modalForm === 'oxQuiz' && <OxQuiz quizs = {quizs} onClose={onClose} setModalForm={setModalForm} setOX={setOX}/>}
        {modalForm === 'result' && <QuizResult sendresultHandle={sendresultHandle}  ox={ox} onClose={onClose} />}
        {modalForm === 'announce' && <Announce  onClose={onClose}/>}
        {modalForm === 'rolling' && <Rolling studentsName={studentsName} pickone={pickone} student={student}  onClose={onClose}/>}
      </Modal>
    </>
  );
};

export default StudentModal;
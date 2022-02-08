import { ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image } from '@chakra-ui/react';
import { useState } from 'react';
import '../scss/StudentModal.scss'
import Timer from './Timer';
import o from '../image/letter-o.png'
import x from '../image/letter-x.png'

const OxQuiz = ({ setModalForm, setOX , quizs}) => {
  const quiz = {
    "quizContent": quizs[0].quizContents,
    "quizAnswer": quizs[0].quizAnswer * 1
  }
  const [choice, setChoice] = useState('0')
  const axiosMyQuiz = () => {

    sessionStorage.setItem('studentresult', quiz.quizAnswer === choice)
    sessionStorage.setItem('quizId', 0)

    setOX(quiz.quizAnswer === choice)
    setModalForm('result')
  }
  return (
    // <ModalContent bgColor='#c7e4f5' w='50rem' h='10rem' marginY='3rem' marginX='1rem' >
    <ModalContent bgColor='#c7e4f5' w='50rem' h='3rem' marginY='7rem' marginX='1rem' >
      <ModalHeader className='student-modal-header'>
        <div style={{"fontSize": "xx-large"}}>신나는 OX퀴즈 시간</div>
        <Timer quizTime={5} axiosMyQuiz={axiosMyQuiz} />
      </ModalHeader>
      {/* <ModalCloseButton /> */}
      <ModalBody className='ox-quiz-body'>
        <div className='ox-quiz-name'>
          <span>{quiz.quizContent}</span>
        </div>
        <div className='ox-quiz-content'>
          <div className='ox-quiz-option' id={choice === '1' ? 'selected' : ''} onClick={() => setChoice('1')}>
            <Image src={o} alt='O' boxSize='150px' />
          </div>
          <div className='ox-quiz-option' id={choice === '2' ? 'selected' : ''} onClick={() => setChoice('2')}>
            <Image src={x} alt='X' boxSize='150px' />
          </div>
        </div>
      </ModalBody>
    </ModalContent>
  );
};

export default OxQuiz;
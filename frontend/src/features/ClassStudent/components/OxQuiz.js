import { ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image } from '@chakra-ui/react';
import { useState } from 'react';
import '../scss/StudentModal.scss'
import Timer from './Timer';
import o from '../image/letter-o.png'
import x from '../image/letter-x.png'

const OxQuiz = ({ setModalForm, setOX }) => {
  const quiz = {
    "quizContent": "퀴즈 문제를 여기에 쓴다 이것의 답은 O일까 X일까 타이머는 현재 5초로 fix 참고로 엔터가 안들어감  문제는 한줄로 적혀진다",
    "quizAnswer": "1"
  }

  const [choice, setChoice] = useState('0')
  const axiosMyQuiz = () => {
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
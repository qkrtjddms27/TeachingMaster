import { ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import '../scss/StudentModal.scss'
import Timer from './Timer';

const OxQuiz = ({ setModalForm, setOX , quizs}) => {
  const [quiz, setQuiz] = useState({})
  const [choice, setChoice] = useState(0)
  useEffect(()=>{
    if(quizs !== undefined ){
    const tmp = {
      "quizTimeout": quizs.quizTimeout,
      "quizContent": quizs.quizContents,
      "quizAnswer": quizs.quizAnswer,
      "quizId": quizs.quizId
    }
    setQuiz(tmp)
    console.log('setQuiz', quiz)}
  },[])

  return (
    <ModalContent bgColor='#c7e4f5' w='50rem' h='3rem' marginY='7rem' marginX='1rem' >
      <ModalHeader className='student-modal-header'>
        <div style={{"fontSize": "xx-large"}}>신나는 OX퀴즈 시간</div>
        <Timer setOX={setOX} quiz={quiz} setModalForm={setModalForm}  />
      </ModalHeader>
      <ModalBody className='ox-quiz-body'>
        <div className='ox-quiz-name'>
          <span>{quiz.quizContent}</span>
        </div>
        <div className='ox-quiz-content'>
          <div className='ox-quiz-option' id={choice === '1' ? 'selected' : ''} onClick={() => setChoice('1')}>
            <Image src="https://i.ibb.co/N67Qt5H/letter-o.png" alt='O' boxSize='150px' />
          </div>
          <div className='ox-quiz-option' id={choice === '2' ? 'selected' : ''} onClick={() => setChoice('2')}>
            <Image src="https://i.ibb.co/ZhRZcMg/letter-x.png" alt='X' boxSize='150px' />
          </div>
        </div>
      </ModalBody>
    </ModalContent>
  );
};

export default OxQuiz;
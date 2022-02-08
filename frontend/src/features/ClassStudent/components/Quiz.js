import { ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { useState } from 'react';
import '../scss/StudentModal.scss'
import Timer from './Timer';

const Quiz = ({ setModalForm, setOX, quizs }) => {
  const quiz = {
    "quizId": quizs[0].quizId,
    "subject": quizs[0].subject,
    "quizPhoto": quizs[0].quizPhoto,
    "quizTitle": quizs[0].quizTitle,
    "quizContents": quizs[0].quizContents,
    "quizAnswer": quizs[0].quizAnswer,
    "openStatus": quizs[0].openStatus,
    "quizTimeout": quizs[0].quizTimeout,
    "quizGrade": quizs[0].quizGrade,
    "userId": quizs[0].userId,
    "options": [
      quizs[0].option1,quizs[0].option2, quizs[0].option3,quizs[0].option4
    ]
  }

  const [choice, setChoice] = useState(0)
  const select = (idx) => {
    setChoice(idx+1)
  }

  const axiosMyQuiz = () => {         // 퀴즈 제출
    console.log(`quizId: ${quiz.quizId}`)
    console.log(`choice: ${choice}`)
    
    sessionStorage.setItem('studentresult', quiz.quizAnswer === choice)
    sessionStorage.setItem('quizId', quiz.quizId)
    
    setOX(quiz.quizAnswer === choice)
    setModalForm('result')
  }

  return (
    <ModalContent bgColor='#84BAAE' w='70rem' h='40rem' marginY='7rem' marginX='1rem' >
      <ModalHeader className='student-modal-header'>
        <div style={{"fontSize": "xx-large"}}>신나는 퀴즈 시간</div>
        <Timer quizTime={quiz.quizTimeout} axiosMyQuiz={axiosMyQuiz} />
      </ModalHeader>
      {/* <ModalCloseButton /> */}
      <ModalBody className='quiz-body'>
        <div className='quiz-name'>
          <span>{quiz.quizContents}</span>
        </div>
        <div className='quiz-content'>
          {quiz.options.map((option, idx) => {
            return (
              <div className='quiz-option' id={choice === idx+1 ? 'selected' : ''} key={idx} onClick={() => select(idx)}>
                  <span>{option}</span>
              </div>
            )
          })}
        </div>
      </ModalBody>
    </ModalContent>
  );
};

export default Quiz;
import { ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import '../scss/StudentModal.scss'
import Timer from './Timer';

const Quiz = ({ setModalForm, setOX, quizs }) => {
  const [quiz, setQuiz] = useState({})
  const [choice, setChoice] = useState(0)

  useEffect(() => {
    console.log('quizs', quizs)
    // console.log('length', quizs.length)
    if (quizs !== undefined) {
      const tmp = {
        "quizId": quizs[quizs.length - 1].quizId,
        "subject": quizs[quizs.length - 1].subject,
        "quizPhoto": quizs[quizs.length - 1].quizPhoto,
        "quizTitle": quizs[quizs.length - 1].quizTitle,
        "quizContents": quizs[quizs.length - 1].quizContents,
        "quizAnswer": quizs[quizs.length - 1].quizAnswer,
        "openStatus": quizs[quizs.length - 1].openStatus,
        "quizTimeout": quizs[quizs.length - 1].quizTimeout,
        "quizGrade": quizs[quizs.length - 1].quizGrade,
        "userId": quizs[quizs.length - 1].userId,
        "options": [
          quizs[quizs.length - 1].option1,quizs[quizs.length - 1].option2, quizs[quizs.length - 1].option3,quizs[quizs.length - 1].option4
        ]
      }
      setQuiz(tmp)
      console.log('setQuiz', quiz)
    }
  }, [])

  const axiosMyQuiz = (choice) => {         // 퀴즈 제출
    console.log(`quizId: ${quiz.quizId}`)
    console.log(`choice: ${choice}`)
    sessionStorage.setItem('studentresult', quiz.quizAnswer === String(choice))
    sessionStorage.setItem('quizId', quiz.quizId)
    
    setOX(quiz.quizAnswer === String(choice))
    setModalForm('result')
  }

  return (
    <div>
      {quiz.options !== undefined && (
        <ModalContent bgColor='#84BAAE' w='70rem' h='40rem' marginY='7rem' marginX='1rem' >
          <ModalHeader className='student-modal-header'>
            <div style={{"fontSize": "xx-large"}}>신나는 퀴즈 시간</div>
            <Timer quizTime={parseInt(quiz.quizTimeout)} axiosMyQuiz={axiosMyQuiz} choice={choice} />
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody className='quiz-body'>
            <div className='quiz-name'>
              <span>{quiz.quizContents}</span>
            </div>
            <div className='quiz-content'>
              {quiz.options.map((option, idx) => {
                return (
                  <div className='quiz-option' id={choice === idx+1 ? 'selected' : ''} key={idx} onClick={() => setChoice(idx+1)}>
                      <span>{option}</span>
                  </div>
                )
              })}
            </div>
          </ModalBody>
        </ModalContent>
      )}
    </div>
  );
};

export default Quiz;
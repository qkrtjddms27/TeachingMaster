import { ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import '../scss/StudentModal.scss'
import Timer from './Timer';

const Quiz = ({ setModalForm, setOX, quizs }) => {
  const [quiz, setQuiz] = useState({})
  const [choice, setChoice] = useState(0)
  const [myChoice,setMyChoice] =useState(0)

  useEffect(() => {
    console.log('quizs', quizs)
    // console.log('length', quizs.length)
    if (quizs !== undefined) {
      const tmp = {
        "quizId": quizs.quizId,
        "subject": quizs.subject,
        "quizPhoto": quizs.quizPhoto,
        "quizTitle": quizs.quizTitle,
        "quizContents": quizs.quizContents,
        "quizAnswer": quizs.quizAnswer,
        "openStatus": quizs.openStatus,
        "quizTimeout": quizs.quizTimeout,
        "quizGrade": quizs.quizGrade,
        "userId": quizs.userId,
        "options": [
          quizs.option1,quizs.option2, quizs.option3,quizs.option4
        ]
      }
      setQuiz(tmp)
      console.log('setQuiz', quiz)
    }
    return (() => console.log("cleanupFunction",choice))
  }, [])

  const thisone = (idx)=>{
    setChoice(idx+1)
    localStorage.setItem("thisone",idx+1)
  }

  return (
    <div>
      {quiz.options !== undefined && (
        <ModalContent bgColor='#84BAAE' w='70rem' h='40rem' marginY='7rem' marginX='1rem' >
          <ModalHeader className='student-modal-header'>
            <div style={{"fontSize": "xx-large"}}>신나는 퀴즈 시간</div>
            <Timer setOX={setOX} quiz={quiz} setModalForm={setModalForm}  />
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody className='quiz-body'>
            <div className='quiz-name'>
              <span>{quiz.quizContents}</span>
            </div>
            <div className='quiz-content'>
              {quiz.options.map((option, idx) => {
                return (
                  <div className='quiz-option' id={choice === idx+1 ? 'selected' : ''} 
                  key={idx} onClick={() => thisone(idx) }>
                      <span>{option}</span>
                  </div>)          
              })}
            </div>
          </ModalBody>
        </ModalContent>
      )}
    </div>
  );
};

export default Quiz;
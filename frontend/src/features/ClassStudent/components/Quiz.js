import { ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { useState } from 'react';
import '../scss/StudentModal.scss'
import Timer from './Timer';

const Quiz = ({ setModalForm, setOX }) => {
  const quiz = {
    "quizId": 3,
    "subject": "English",
    "quizPhoto": "http://dummyimage.com/135x100.png/cc0000/ffffff",
    "quizTitle": "Software Engineer II",
    "quizContents": "Nulla tempus.",
    "quizAnswer": 3,
    "openStatus": true,
    "quizTimeout": 2,
    "quizGrade": 5,
    "userId": "ssafy3",
    "options": [
      "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.",
      "Praesent id massa id nisl venenatis lacinia.",
      "Cras non velit nec nisi vulputate nonummy.",
      "Cras pellentesque volutpat dui."
    ]
  }

  const [choice, setChoice] = useState(0)
  const select = (idx) => {
    setChoice(idx+1)
  }

  const axiosMyQuiz = () => {         // 퀴즈 제출
    console.log(`quizId: ${quiz.quizId}`)
    console.log(`choice: ${choice}`)
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
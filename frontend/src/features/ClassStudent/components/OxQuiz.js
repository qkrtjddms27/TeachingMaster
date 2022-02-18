import { ModalContent,Img, ModalHeader, ModalCloseButton, ModalBody, Image } from '@chakra-ui/react';
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
        "quizContents": quizs.quizContents,
        "quizAnswer": quizs.quizAnswer,
        "quizId": quizs.quizId
      }
      setQuiz(tmp)
    }
  },[])
  const thisone = (idx)=>{
    setChoice(idx)
    localStorage.setItem("thisone",idx)
  }
  return (
    <div>
    {quizs !== undefined && (
      <ModalContent bgColor='rgb(245, 198, 110)' w='70rem' h='3rem' marginY='7rem' marginX='1rem' >

      <ModalHeader className='student-modal-header'>
        <div style={{"fontSize": "xx-large"}}>신나는 OX퀴즈 시간</div>
        <Timer setOX={setOX} quiz={quizs} setModalForm={setModalForm}  />
      </ModalHeader>
      <ModalBody className='ox-quiz-body'>
        <Img className='tiger' src="https://cdn.discordapp.com/attachments/885744368399560725/940788467040927744/1ebc39a1c15ce4e0.png"/>
        <div className='ox-quiz-name'>
          <span>{quizs.quizContents}</span>
        </div>
        <div className='ox-quiz-content'>
          <div className='ox-quiz-option' id={choice === 1 ? 'selected' : ''} onClick={() => thisone(1) }>
            <Image src="https://i.ibb.co/N67Qt5H/letter-o.png" alt='O' boxSize='150px' />
          </div>
          <div className='ox-quiz-option' id={choice === 2 ? 'selected' : ''} onClick={() => thisone(2) }>
            <Image src="https://i.ibb.co/ZhRZcMg/letter-x.png" alt='X' boxSize='150px' />
          </div>
        </div>
      </ModalBody>
    </ModalContent>
    )}
    </div>
  );
};

export default OxQuiz;
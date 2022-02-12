import React, { useEffect, useState } from 'react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Image } from '@chakra-ui/react';
import '../scss/modal.scss'
import axios from 'axios';
import { serverUrl, setToken } from '../../../components/TOKEN';

const Modalquiz = ({change, student, onClose}) => {
  const [logs, setLogs] = useState([])
  // 퀴즈 로그 get
  useEffect(()=>{
    axios({
      url: `${serverUrl}/student/select/quiz_log/${student.studentId}`,
      method: 'GET',
      headers: setToken()
    })
    .then(({data}) => {
      console.log('quiz log data:', data)
      setLogs(data)
    })
    .catch(err => console.log('get memo list err:', err))
  }, [])

  return (
  <div className='quiz-log'>
    <div className='quiz-log-title'>
      <img className='quiz-log-img' src='https://i.ibb.co/L8gSsGD/image-27.png' alt='마곰'/>
      <div> {student.studentName} 학생의  퀴즈결과 </div>
      <img className='quiz-log-img' src='https://i.ibb.co/L8gSsGD/image-27.png' alt='마곰'/>
    </div>
    <div className='quiz-log-scroll'>
      <Accordion allowToggle>
        {logs.map((log, idx) =>
          <AccordionItem key={idx}>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>{idx+1}.&nbsp;{log.quizResult ? '⭕' : '❌'}&nbsp;{log.quizTitle}</Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <p className='Q'>
                <span>문제) {log.quizContents}</span>
                {log.studentAnswer === 0 && <span className='beap'>문제를 풀지 않음</span>}
              </p>
              {log.quizResult ? (
              <div className='correct'>
                <p className={log.quizAnswer === 1 ? 'o' : ''}>1) {log.options[0]}</p>
                <p className={log.quizAnswer === 2 ? 'o' : ''}>2) {log.options[1]}</p>
                <p className={log.quizAnswer === 3 ? 'o' : ''}>3) {log.options[2]}</p>
                <p className={log.quizAnswer === 4 ? 'o' : ''}>4) {log.options[3]}</p>
              </div>
              ) : (
                <div className='wrong'>
                  <p className={log.quizAnswer === 1 ? 'o' : ''} id={log.studentAnswer === 1 ? 'x' : ''}>1) {log.options[0]}</p>
                  <p className={log.quizAnswer === 2 ? 'o' : ''} id={log.studentAnswer === 2 ? 'x' : ''}>2) {log.options[1]}</p>
                  <p className={log.quizAnswer === 3 ? 'o' : ''} id={log.studentAnswer === 3 ? 'x' : ''}>3) {log.options[2]}</p>
                  <p className={log.quizAnswer === 4 ? 'o' : ''} id={log.studentAnswer === 4 ? 'x' : ''}>4) {log.options[3]}</p>
                </div>
              )}
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </div>
    <Button onClick={() => change("main")}>뒤로가기</Button>
  </div>);
};

export default Modalquiz;

import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import '../scss/modal.scss'
import axios from 'axios';
import { serverUrl, setToken } from '../../../components/TOKEN';
import { Accordion } from 'react-bootstrap';

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
    <div className='log-accordion'>
      <Accordion defaultActiveKey='0' flush>
      {logs.map((log, idx) => {
        return (
        <Accordion.Item eventKey={String(idx)} key={idx}>
          <Accordion.Header>
            <div>{log.quizResult ? '⭕' : '❌'}&nbsp;</div>
            <div>{idx+1}.&nbsp;</div>
            <div>{log.quizTitle}</div>
          </Accordion.Header>
          <Accordion.Body>
            <div>{log.quizContents}</div>
            <div>1) {log.options[0]}</div>
            <div>2) {log.options[1]}</div>
            <div>3) {log.options[2]}</div>
            <div>4) {log.options[3]}</div>
          </Accordion.Body>
        </Accordion.Item>
        )
      }
      )}
      </Accordion>
    </div>
    <Button onClick={()=>change("main")}>뒤로</Button>
  </div>);
};

export default Modalquiz;

import React, { useState } from 'react';
import {Box,Popover,PopoverTrigger,PopoverContent,PopoverBody,PopoverArrow,
  PopoverCloseButton,Heading,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,
} from '@chakra-ui/react'
import UserVideoComponent from '../openVidu/UserVideoComponent'
import '../scss/ClassTeacher.scss'
import axios from 'axios';
import { setToken, serverUrl } from '../../../components/TOKEN';
import { useEffect } from 'react';

const StudentScreen = ({speakingStudents,highlighting,streamManager,total,getAverage, i, announce, plusStar, results, answerCheck}) => {
  const [memo,setMemo] = useState('')
  const [check, setCheck] = useState(true)
  const [scoreState,setScoreState] = useState("normal")
  const [student, setStudent] = useState(JSON.parse(streamManager.stream.connection.data))
  const [memoList, setMemoList] = useState([])
  const [isSpeaking,setIsSpeaking] = useState(false)
  // 별점주기
  const star = (i) => {
    setStudent({...student, "countingStar": student.countingStar+1, "studentScore": student.studentScore+1})
    plusStar(i)
    axios({
      url: `${serverUrl}/student/star`,
      method: 'POST',
      headers: setToken(),
      data: {
        studentId: String(student.studentId),
      }
    })
  }

  // 발표시키기(+별점도 줌)
  const ann = (i) => {
    announce(i)
    star(i)
  }

  // 메모작성
  const onSubmit = (e)=>{
    e.preventDefault();
    const {userId} = JSON.parse(localStorage.getItem("user"))
    axios({
      url: `${serverUrl}/memo`,
      method: 'POST',
      headers: setToken(),
      data: {
        "memoContent": memo,
        "studentId": student.studentId,
        "userId": userId
      }
    })
    .then(() => setMemo(''))
    .catch(err => console.log('postMemo err:', err))
  }

  // 메모보기
  const showMemo = () => {
    axios({
      url: `${serverUrl}/memo/${student.studentId}`,
      method: 'GET',
      headers: setToken()
    })
    .then(({data}) => {
      setMemoList(data)
    })
    .catch(err => console.log('get memo list err:', err))
  }
  useEffect(()=>{
    const isIn = speakingStudents.includes(student.studentId)
    if (isIn){setIsSpeaking(true)}
    else{setIsSpeaking(false)}
  },[speakingStudents])

  useEffect(()=>{
    setScoreState("normal")
    getAverage()
      // eslint-disable-next-line no-lone-blocks
    { if (highlighting){
      if(student.countingStar >=total){
        setScoreState("high")
      }
      else{ setScoreState("low")
    }}}
  },[highlighting,total])

  useEffect(() => {
    if (answerCheck) {
      results.map(result => {
        if (result.studentId === student.studentId) {
          setCheck(result.studentResult === 'true' ? true : false)
        }
      })
    }
  }, [answerCheck, results])

  return (
    <div>
      <Popover >
        <PopoverTrigger>
          <div className='student_screen' >
            <UserVideoComponent 
            isSpeaking = {isSpeaking}
            answerCheck={answerCheck}
            check={check}
            score={ scoreState}
            streamManager={streamManager} />
          </div>
        </PopoverTrigger>
        <PopoverContent width="15rem">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Heading>{student.clientData}</Heading>
            <div> 주간⭐:{student.countingStar}</div>
            <div> 총 ⭐:{student.studentScore}</div>
            <div onClick={() => ann(i)} className='pointer'> 발표 시키기</div>
            <div onClick={() => star(i)} className='pointer'> 별점 주기</div>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left' onClick={() => showMemo()}>
                    메모 보기
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {memoList !== undefined && 
                    <div>
                      {memoList.map((memo, idx) => <li key={idx}>{memo.memoContent}</li>)}
                    </div>
                  }
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                    메모하기
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <form onSubmit={(e)=>onSubmit(e)}>
                    <input value={memo} onChange={(e)=>{setMemo(e.target.value)}} placeholder='메모'/>
                  </form>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      
    </div>
  );
};

export default StudentScreen;

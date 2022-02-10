import React, { useState } from 'react';
import {Box,Popover,PopoverTrigger,PopoverContent,PopoverBody,PopoverArrow,
  PopoverCloseButton,Heading,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,
} from '@chakra-ui/react'
import UserVideoComponent from '../openVidu/UserVideoComponent'
import '../scss/ClassTeacher.scss'
import axios from 'axios';
import { setToken, serverUrl } from '../../../components/TOKEN';
import { useEffect } from 'react';

const StudentScreen = ({highlighting,streamManager,total, i, announce, plusStar, results, answerCheck}) => {
  const [memo,setMemo] = useState('')
  const [check, setCheck] = useState(true)
  let scoreState  = "normal"
  const onSubmit = (e)=>{
    e.preventDefault();
    console.log(memo)
    setMemo("")
  }
  // const student = JSON.parse(streamManager.stream.connection.data)
  const [student, setStudent] = useState(JSON.parse(streamManager.stream.connection.data))
  // eslint-disable-next-line no-lone-blocks
  { if (highlighting){
    if(student.countingStar >=total){
      scoreState = "high"
    }
    else{ scoreState = "low"
  }}}
  const star = (i) => {
    setStudent({...student, "countingStar": student.countingStar+1, "studentScore": student.studentScore+1})
    plusStar(i)
    axios({
      url: `${serverUrl}/student/star`,
      method: 'PUT',
      headers: setToken(),
      data: {
        studentId: student.studentId,
      }
    })
  }

  const ann = (i) => {
    announce(i)
    star(i)
  }

  useEffect(() => {
    if (answerCheck) {
      results.map(result => {
        if (result.studentId === student.studentId) {
          setCheck(result.studentResult === 'true' ? true : false)
        }
      })
    }
  }, [answerCheck])

  return (
    <div>
      <Popover >
        <PopoverTrigger>
          <div className='student_screen' >
            <UserVideoComponent 
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

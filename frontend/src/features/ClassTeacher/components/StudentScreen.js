import React, { useState } from 'react';
import {Box,Popover,PopoverTrigger,PopoverContent,PopoverBody,PopoverArrow,
  PopoverCloseButton,Heading,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,
} from '@chakra-ui/react'
import UserVideoComponent from '../openVidu/UserVideoComponent'
import '../scss/ClassTeacher.scss'

const StudentScreen = ({highlighting,streamManager,total, i, announce}) => {
  const [memo,setMemo] = useState('')
  let scoreState  = "normal"
  const onSubmit = (e)=>{
    e.preventDefault();
    console.log(memo)
    setMemo("")
  }
  const student = JSON.parse(streamManager.stream.connection.data)
  // eslint-disable-next-line no-lone-blocks
  { if (highlighting){
    if(student.weeklyStar >=total){
      scoreState = "high"
    }
    else{ scoreState = "low"
  }}}

  return (
    <div>
      <Popover >
        <PopoverTrigger>
          <div className='student_screen' >
            <UserVideoComponent 
            score={ scoreState}
            streamManager={streamManager} />
          </div>
        </PopoverTrigger>
        <PopoverContent width="15rem">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Heading>{student.clientData}</Heading>
            <div> 주간⭐:{student.weeklyStar}</div>
            <div> 총 ⭐:{student.allStar}</div>
            <div onClick={() => announce(i)} className='pointer'> 발표 시키기</div>
            <div> 별점 주기</div>
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

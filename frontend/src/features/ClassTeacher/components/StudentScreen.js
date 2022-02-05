import React, { useEffect, useState } from 'react';
import {Box,Popover,PopoverTrigger,PopoverContent,PopoverBody,PopoverArrow,
  PopoverCloseButton,Heading,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,
} from '@chakra-ui/react'
import { Button } from 'bootstrap';
import UserVideoComponent from '../openVidu/UserVideoComponent'

const StudentScreen = ({student,streamManager}) => {
  const [memo,setMemo] = useState('')
  const onSubmit = (e)=>{
    e.preventDefault();
    console.log(memo)
    setMemo("")
  }
  return (
    <div>
      <Popover >
        <PopoverTrigger>
          <div className='student_screen' >
            <UserVideoComponent streamManager={streamManager} />
          </div>
        </PopoverTrigger>
        <PopoverContent width="15rem">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Heading>이름</Heading>
            {/* <Heading>"{streamManager.name}"</Heading> */}
            <div> 주간⭐:10</div>
            <div> 총 ⭐:20</div>
            <div> 발표 시키기</div>
            <div> 마이크 Off</div>
            <div> 카메라 Off</div>
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

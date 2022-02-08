import React, { useState, useEffect, useRef } from 'react';
import { ModalContent, ModalBody, ModalCloseButton, Image } from '@chakra-ui/react';

const QuizResult = ({ onClose, ox, resultQ }) => {
  const [sec, setSec] = useState(3)
  const time = useRef(3)
  const timerId = useRef(null)
  useEffect(() => {
    timerId.current = setInterval(() => {
      setSec(time.current % 60)
      time.current -= 1
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])

  useEffect(() => {
    if (time.current < 0) {           // 만약 타임 아웃이 발생했을 경우
      console.log('여기까지 도착!')
      resultQ()
      // this.resultQ()
      console.log('여기까진 도착못해!')
      onClose()
      clearInterval(timerId.current)
    }
  }, [sec])

  return (
    <ModalContent bgColor='transparent' boxShadow='none' w='70rem' h='30rem' marginY='7rem' marginX='1rem' >
      {/* <ModalCloseButton /> */}
      <ModalBody className='OX'>
        <Image src={ox ? 
          "https://cdn.discordapp.com/attachments/885744368399560725/940500434345426944/O.png" : 
          "https://cdn.discordapp.com/attachments/885744368399560725/940500440368418868/X.png"}
          boxSize='lg' marginX='auto'
        />
      </ModalBody>
    </ModalContent>
  );
};

export default QuizResult;
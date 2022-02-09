import React, { useState, useEffect, useRef } from 'react';
import { ModalContent, ModalBody, ModalCloseButton, Image } from '@chakra-ui/react';

const QuizResult = ({ onClose, ox, sendresultHandle }) => {
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
      sendresultHandle()
      onClose()
      clearInterval(timerId.current)
    }
  }, [sec])

  return (
    <ModalContent bgColor='transparent' boxShadow='none' w='70rem' h='30rem' marginY='7rem' marginX='1rem' >
      {/* <ModalCloseButton /> */}
      <ModalBody className='OX'>
        {ox ==="O" && <Image  boxSize='lg' marginX='auto' src="https://cdn.discordapp.com/attachments/885744368399560725/940500434345426944/O.png" />}
        {ox ==="X" && <Image  boxSize='lg' marginX='auto' src="https://cdn.discordapp.com/attachments/885744368399560725/940500440368418868/X.png" />}
      </ModalBody>
    </ModalContent>
  );
};

export default QuizResult;
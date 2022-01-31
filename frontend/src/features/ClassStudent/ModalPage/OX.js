import React, { useState, useEffect, useRef } from 'react';
import { ModalContent, ModalBody, ModalCloseButton, Image } from '@chakra-ui/react';
import O from '../image/O.png'
import X from '../image/X.png'

const OX = ({ onClose, ox }) => {
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
      onClose()
      clearInterval(timerId.current)
    }
  }, [sec])

  return (
    <ModalContent bgColor='transparent' w='70rem' h='30rem' marginY='7rem' marginX='1rem' >
      {/* <ModalCloseButton /> */}
      <ModalBody className='OX'>
        <Image src={ox ? O : X} boxSize='lg' marginX='auto'/>
      </ModalBody>
    </ModalContent>
  );
};

export default OX;
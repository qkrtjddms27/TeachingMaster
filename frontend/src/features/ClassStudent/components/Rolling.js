import { useEffect, useState,useRef } from 'react';
import {  ModalContent,  ModalBody,  } from '@chakra-ui/react';
import '../scss/rolling.scss'

const Rolling = ({ isOpen, onOpen, onClose,student,pickone,studentsName }) => {
  const [sec, setSec] = useState(5)
  const time = useRef(5)
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
  let i = 0
  return (
    <ModalContent bgColor='#29313200' w='85rem' h='45rem' marginY='7rem' marginX='1rem' >
        {pickone !== undefined &&<>
      <ModalBody className='rolling'>
      <div className="slider">
        <img className='toto' src="https://i.ibb.co/gSChcjb/1.png" alt='토토'/>
        <div className="caption">
          오늘의 발표자는 
          <div className="text-box">
            <div>{studentsName[i]}</div>
            <div>{studentsName[(i+1)%studentsName.length]}</div>
            <div>{studentsName[(i+2)%studentsName.length]}</div>
            <div>{studentsName[(i+3)%studentsName.length]}</div>
            <div>{studentsName[(i+4)%studentsName.length]}</div>
            <div>{studentsName[(i+5)%studentsName.length]}</div>
            <div>{studentsName[(i+6)%studentsName.length]}</div>
            <div>{studentsName[(i+7)%studentsName.length]}</div>
            <div>{studentsName[(i+8)%studentsName.length]}</div>
            <div>{pickone}</div> 
          </div>
        </div>
      </div>
      </ModalBody>
        </>
      }
    </ModalContent>
  );
};

export default Rolling;
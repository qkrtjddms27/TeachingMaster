import { ModalBody, ModalCloseButton, ModalContent, ModalHeader, Textarea, Image, RadioGroup, Stack, Radio, Button } from '@chakra-ui/react';
import '../scss/TeacherModal.scss'
import React, { useState } from 'react';

const OxQuiz = () => {
  const [ans, setAns] = useState('1')
  const [value, setValue] = useState('')
  const inputChange = (e) => {
    const inputValue = e.target.value
    setValue(inputValue)
  }
  const submitOX = () => {
    console.log(`inputData: ${value}`)
    console.log(`answer: ${ans}`)
  }

  return (
    <ModalContent w='40vw' marginY='20rem' marginX='1rem' >
      <ModalHeader className='teacher-modal-header'>
        <div style={{"fontSize": "xx-large"}}>OX 퀴즈</div>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Textarea value={value} placeholder='OX 퀴즈 문제를 적으세요&#13;&#10;답을 체크하지 않으면 정답은 O가 됩니다' className='ox-textarea'
          onChange={(e) => inputChange(e)} autoFocus h={250} resize='none' 
        />
        <div className='ox-bottom'>
          <RadioGroup onChange={setAns} defaultValue='1'>
            <Stack spacing={10} direction='row'>
              <Radio size='lg' colorScheme='green' value='1'>O</Radio>
              <Radio size='lg' colorScheme='red' value='2'>X</Radio>
            </Stack>
          </RadioGroup>
          <Button variant='outline' onClick={submitOX} colorScheme='telegram'>출제</Button>
        </div>
      </ModalBody>
    </ModalContent>
  );
};

export default OxQuiz;
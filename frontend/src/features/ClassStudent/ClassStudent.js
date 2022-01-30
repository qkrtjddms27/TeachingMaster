import { Button,Box,Text,Input, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import "./scss/ClassStudent.scss"
import teacher_screen_img from './image/수업화면.png'
import child_img from './image/아이.png'
import micOn from './image/말할래요.png'
import micOff from './image/쉿버튼.png'
import CamOn from './image/카메라켜기.png'
import CamOff from './image/카메라끄기.png'
import Sticker from './ModalPage/Sticker';
const ClassStudent = () => {
  const [Cam,setCam] = useState(true)
  const [Mic,setMic] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const students = [
    {name:"아이1",img:"child_img"},
    {name:"아이1",img:"child_img"},
    {name:"아이1",img:"child_img"},
    {name:"아이1",img:"child_img"},
    {name:"아이1",img:"child_img"},
    {name:"아이1",img:"child_img"},
    {name:"아이1",img:"child_img"},
    {name:"아이1",img:"child_img"},
    {name:"아이1",img:"child_img"},
  ]
  return (
    <div className='ClassStudent'>
      {/* <div className='btn_box'>
        <Button className='exitButton'>수업 나가기</Button>
      </div> */}

      <Box className='Conference_box'>
        <div className='left'>
          <div className='student_box'>
            {students.map((student, idx)=>{
              return (
              <div className='student_screen' key={idx}>
                <img src={child_img} alt='애'/>
              </div>
              )
            })}
          </div>
          <div className='teacher_box'>
            <img alt='선생님' src={teacher_screen_img}></img>
          </div>
          <div className='btn_box'>
            <Button className='StarPage' onClick={onOpen}>칭찬 스티커</Button>
            <Sticker isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
          </div>
        </div>
        <div className='right'>
          <div className='btn_box'>
            <Button className='exitButton'>수업 나가기</Button>
          </div>
          <div className='chatting_box'>
            <div style={{"height":"1rem"}}></div>
            <div className='chatting_log'>
              <Text>안녕</Text>
            </div>
              <Input className='input_box'/>
          </div>
          <div className='Button_box' >
            {Cam?<img className='OnOffButton' src={CamOff} alt='버튼' onClick={()=>{setCam(false)}} />:
                  <img className='OnOffButton' src={CamOn} alt='버튼' onClick={()=>{setCam(true)}} /> }
            {Mic?<img className='OnOffButton' src={micOff} alt='버튼' onClick={()=>{setMic(false)}} />:
                <img className='OnOffButton' src={micOn} alt='버튼' onClick={()=>{setMic(true)}} />}
            
            
            
            
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ClassStudent;

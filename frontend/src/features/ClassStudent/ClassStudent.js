import { Button, Box, Input, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import "./scss/ClassStudent.scss"
import teacher_screen_img from './image/수업화면.png'
import child_img from './image/아이.png'
import micOn from './image/말할래요.png'
import micOff from './image/쉿버튼.png'
import CamOn from './image/카메라켜기.png'
import CamOff from './image/카메라끄기.png'
import StudentModal from './ModalPage/StuendModal';

const ClassStudent = () => {
  const toast = useToast()
  const [Cam,setCam] = useState(true)
  const [Mic,setMic] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalForm, setModalForm] = useState()
  const modalOpen = (kind) => {
    setModalForm(kind)
    onOpen()
  }
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
          <div className='left_btn_box'>
            {Mic&& <div className='warning'>마이크가 켜져있어요</div>}
            <Button className='StarPage' onClick={() => modalOpen('announce')}>발표하세요</Button>
            <Button className='StarPage' onClick={() => modalOpen('quiz')}>quiz</Button>
            <Button className='StarPage' onClick={() => modalOpen('sticker')}>칭찬 스티커</Button>
            <StudentModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} modalForm={modalForm} setModalForm={setModalForm} setMic={setMic} />
          </div>
        </div>
        <div className='right'>
          <div className='right_up_btn_box'>
            <Button className='exitButton'>수업 나가기</Button>
          </div>
          <div className='chatting_box'>
            <div style={{height:"1rem"}}/>
            <div className='chatting_log'>
              <div style={{height:"1rem"}} />
              <div className='text'>
                <div className='chat_line'>
                  <span className='chat_name'>현홍</span>
                  <div className='chat_content'>안녕안녕안녕안녕안녕안녕안안녕안안녕안안녕안녕</div><br/>
                </div>
                <div className='chat_line'>
                  <span className='chat_name'>혜진</span><span className='chat_content'> 안녕</span><br/>
                </div>
            </div>
            </div>
            <Input className='input_box'/>
          </div>
          <div className='right_down_btn_box' >
            {Cam?<img className='OnOffButton' src={CamOff} alt='버튼' onClick={()=>{setCam(false)
                  toast({
                    position: 'bottom-left',
                    render: () => (
                      <Box color='white' p={3} bg='red.500'>
                        카메라를 껐습니다.
                      </Box>
                    ),
                  })}} />:
                  <img className='OnOffButton' src={CamOn} alt='버튼' 
                  onClick={()=>{setCam(true)
                    toast({
                      position: 'bottom-left',
                      render: () => (
                        <Box color='white' p={3} bg='blue.500'>
                          카메라를 켰습니다.
                        </Box>
                      ),
                    })}} /> }
            {Mic?<img className='OnOffButton' src={micOff} alt='버튼' onClick={()=>{setMic(false)
                  toast({
                    position: 'bottom-left',
                    render: () => (
                      <Box color='white' p={3} bg='orange.500'>
                        마이크를 껐습니다.
                      </Box>
                    ),
                  })}} /> :
                <img className='OnOffButton' src={micOn} alt='버튼' 
                onClick={()=>{setMic(true)
                  toast({
                    position: 'bottom-left',
                    render: () => (
                      <Box color='white' p={3} bg='blue.200'>
                        마이크를 켰습니다.
                      </Box>
                    ),
                  })}} /> }        
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ClassStudent;

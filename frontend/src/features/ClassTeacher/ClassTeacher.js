import { Button, Box, Text,Input, useDisclosure, useToast, Icon } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import "./scss/ClassTeacher.scss"
import teacher_screen_img from './image/수업화면.png'
import StudentScreen from './StudentScreen';
import TeacherModal from './ModalPage/TeacherModal';
import { BsMicMute, BsFillMicFill, BsCameraVideoOff, BsFillCameraVideoFill, BsFillStarFill } from "react-icons/bs"
import { MdExtension, MdOutlineExtensionOff, MdQuiz } from "react-icons/md"
import { GiCoffeeCup } from "react-icons/gi"
import { FaSchool } from "react-icons/fa"
import { useHistory } from 'react-router-dom';


const ClassTeacher = ({setOnAir}) => {
  let history = useHistory()
  useEffect(()=>{
    setOnAir(true)
  },[])
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  const [modalForm, setModalForm] = useState()
  const modalOpen = (kind) => {
    setModalForm(kind)
    onOpen()
  }
  const toast = useToast()
  const [Cam, setCam] = useState(true)
  const [Mic, setMic] = useState(true)
  const [highlighting, setHighlighting] = useState(false)
  const [breaktime, setBreaktime] = useState(false)
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
    {name:"아이1",img:"child_img"},
    {name:"아이1",img:"child_img"},
    {name:"아이1",img:"child_img"},
    {name:"아이1",img:"child_img"},
    {name:"아이1",img:"child_img"},
    {name:"아이1",img:"child_img"},    
  ]

  return (
    <div className='ClassTeacher'>
      <Box className='Conference_box'>
        <div className='top'>
          <div className='student_box'>
            {students.map((student,idx) => {
              return (
                <div key={idx}>
                  <StudentScreen student={student}/>
                </div>
              )}
            )}  
            <div className='student_screen'>
              <img alt='선생님' src={teacher_screen_img}/>
            </div>
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
        </div>
        <div className='bottom'>
          <div className='left_btn_box'>
            <Button className='exitButton' 
              onClick={() => {
                history.push('/home')
                setOnAir(false)
              }}
            >수업 나가기</Button>
          </div>
          <div className='right_btn_box'>
            <button className='OnOffButton' title='OX 퀴즈'
              onClick={() => modalOpen('ox')}
            ><Icon as={MdQuiz} w={8} h={8} /></button>
            <button className='OnOffButton' title='즐겨찾기 퀴즈'
              onClick={() => modalOpen('bookmark')}
            ><Icon as={BsFillStarFill} w={8} h={8} /></button>
            <TeacherModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} modalForm={modalForm} setModalForm={setModalForm} />
            {Cam ? (
              <button className="OnOffButton" title='Video Off'
                onClick={() => {
                  setCam(false)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box color="white" p={3} bg="red.500">카메라를 껐습니다</Box>)
                  })
                }}
              >
                <Icon as={BsFillCameraVideoFill} w={8} h={8} />
              </button>
              ) : (
              <button className="OnOffButton" title='Video On'
                onClick={() => {
                  setCam(true)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box color="white" p={3} bg="blue.500">카메라를 켰습니다</Box>)
                  })
                }}
              >
                <Icon as={BsCameraVideoOff} w={8} h={8} />
              </button>
            )}  
            {Mic ? (
              <button className="OnOffButton" title='Mic Off'
                onClick={() => {
                  setMic(false)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box color="white" p={3} bg="orange.500">마이크를 껐습니다</Box>)
                  })
                }}
              >
                <Icon as={BsFillMicFill} w={8} h={8} />
              </button>
              ) : (
              <button className="OnOffButton" title='Mic On'
                onClick={() => {
                  setMic(true)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box color="white" p={3} bg="blue.200">마이크를 켰습니다</Box>)
                  })
                }}
              >
                <Icon as={BsMicMute} w={8} h={8} />
              </button>
            )}
            {highlighting ? (
              <button className="OnOffButton" title='하이라이팅 끄기'
                onClick={() => {
                  setHighlighting(false)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box p={3} bg="red.100">하이라이팅을 껐습니다</Box>)
                  })
                }}
              >
                <Icon as={MdExtension} w={8} h={8} />
              </button>
              ) : (
              <button className="OnOffButton" title='하이라이팅 끄기'
                onClick={() => {
                  setHighlighting(true)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box p={3} bg="blue.100">하이라이팅을 켰습니다</Box>)
                  })
                }}
              >
                <Icon as={MdOutlineExtensionOff} w={8} h={8} />
              </button>
            )}
            {breaktime ? (
              <button className="OnOffButton" title='수업 시작하기'
                onClick={() => {
                  setBreaktime(false)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box p={3} bg="orange.100">쉬는시간이 끝났습니다</Box>)
                  })
                }}
              >
                <Icon as={GiCoffeeCup} w={8} h={8} />
              </button>
              ) : (
              <button className="OnOffButton" title='쉬는시간 갖기'
                onClick={() => {
                  setBreaktime(true)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box p={3} bg="green.100">쉬는시간 입니다</Box>)
                  })
                }}
              >
                <Icon as={FaSchool} w={8} h={8} />
              </button>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ClassTeacher;
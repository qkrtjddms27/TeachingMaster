import { Button,Box,Text,Input } from '@chakra-ui/react';
import React from 'react';
import "./scss/ClassStudent.scss"
import teacher_screen_img from './image/수업화면.png'
import child_img from './image/아이.png'
const ClassStudent = () => {
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
            {students.map(student=>{
              return (
              <div className='student_screen'>
                <img src={child_img} alt='애'/>
              </div>
              )
            })}
          </div>
          <div className='teacher_box'>
            <img alt='선생님' src={teacher_screen_img}></img>
          </div>
          <div className='btn_box'>
            <Button className='StarPage'>칭찬 스티커</Button>
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
        </div>
      </Box>
    </div>
  );
};

export default ClassStudent;

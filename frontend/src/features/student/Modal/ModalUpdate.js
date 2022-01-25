import React, { useState } from 'react';
import { Button,Input } from '@chakra-ui/react';
import './modal.scss'

const ModalUpdate = ({change,student,onClose}) => {
  const [file,setFile] = useState("")
 
  
  
  
  const submit = ()=>{
    // axios 요청 
    change("main")
  }
  return (
    <div className='modal-main'>
      <div className='left'>
        <div className='left_top' >
          <img className='image' alt='학생사진' src={file} />
          <div>
            <div className='name'>{student.name}</div>
            <div className='stars'>이번주 ⭐&nbsp;{student.star}</div>
            <div className='stars'>누적&emsp;&nbsp;⭐&nbsp;{student.star*2}</div>
            <form>
              
            </form>
              <label className="input-file-button" for="input-file">
                사진 업로드
              </label>
              <Input 
                type="file" id="input-file" style={{display:"none"}}/>
              <Button type='submit'>저장</Button>
          </div>
        </div>
        <div className='left_bot'>
          <div className='contents'>  
            <p>메일주소 : <Input value={student.email}/></p>
            <p>연락처 : <Input value={student.phone}/></p>
            <p>보호자 성함 : <Input value="김동수"/></p>
            <p>보호자 관계 : <Input value="아버지"/></p>
            <p>보호자 연락처: <Input value={student.phone}/></p>
          </div>
        </div>
      </div>

      <div className='right'>
        <div className='memo'>
              <p className='memo_title'>메모</p>
              <div className='memo_contents'>
                <p>우리반 반장</p>
                <p>선생님을 잘 따른다</p>
                <p>지난 기말고사 1등</p>
              </div>
            </div>
        <Button onClick={()=>{change("main")}} className='go_back'>
          뒤로
        </Button>
        <Button onClick={()=>{submit()}} className='go_save'>
          저장
        </Button>
      </div>
  </div>
  );
};

export default ModalUpdate;

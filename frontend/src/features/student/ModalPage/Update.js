import React, { useState } from 'react';
import { Button,Input } from '@chakra-ui/react';
import '../scss/modal.scss'
import axios from 'axios';
import { setToken } from '../../../components/TOKEN';

const ModalUpdate = ({change,student,onClose,setStudent}) => {
  const [file,setFile] = useState("")
  const [Email,setEmail] = useState(student.studentEmail)
  const [phone,setPhone] = useState(student.studentPhone)
  const [address,setAddress] = useState(student.address)
  const [parentsName,setParentsName] = useState(student.parentsName)
  const [relation,setRelation] = useState(student.relation)
  const [parentsPhone,setParentsPhone] = useState(student.parentsPhone)
  const [imgBase64,setImagbase64]=useState(student.studentProfile) // 파일 base64
  // const [imgFile,setImgFile] = useState([]) // 이미지파일

  const onSubmit = ()=>{
    console.log(student)
    console.log(typeof(student.studentProfile))
    const data ={
      "roomGrade":student.room.roomGrade ,
      "roomNum":student.room.roomNum,
      "studentId": student.studentId,
      "studentName": student.studentName,
      "studentProfile": imgBase64,
      "address": address,
      "parentsName": parentsName,
      "parentsPhone": parentsPhone,
      "relation": relation,
      "studentEmail": Email,
      "studentPhone": phone,
    }
    axios({
      url:`http://localhost:8080/api/student`,
      method:"PUT",
      headers:setToken(),
      data,
    })
    .then(res=>{
      change("main")
      const stuData = 
      {...student,
        "studentProfile": imgBase64,
        "address": address,
        "parentsName": parentsName,
        "parentsPhone": parentsPhone,
        "relation": relation,
        "studentEmail": Email,
        "studentPhone": phone
      }
      setStudent(stuData)
    })
    .catch(err=>{
      console.log(data)
      console.log("학생 수정 에러")
      console.log(err)
    })
  }
  const handleChangeFile = event => {
    let reader = new FileReader(); 
    reader.onloadend = e => {
      // 2. 읽기가 완료되면 아래코드가 실행
      const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
      if (base64) {
        setImagbase64(base64.toString())
      }
    };
    if (event.target.files[0]) {
      console.log(event)
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
      // setImgFile(event.target.files[0])
      console.log(imgBase64.length)
    }
  };
  return (
    <div className='modal-main'>
      <div className='left'>
        <div className='left_top' >
          {/* <img className='image' alt='학생사진' src={student.studentProfile} /> */}
          <img className='image' alt='학생사진' src={imgBase64} />
          <div>
            <div className='name'>{student.studentName}</div>
            <div className='stars'>이번주 ⭐&nbsp;{student.countingStar}</div>
            <div className='stars'>누적&emsp;&nbsp;⭐&nbsp;{student.studentScore}</div>
            <form>
              
            </form>
              {/* <label className="input-file-button" for="input-file"> */}
              <label htmlFor="input-file" className="input-file-button" onChange={handleChangeFile}>
                사진 업로드
              </label>
              <Input type="file" onChange={handleChangeFile}  id="input-file" style={{display:"none"}}/>
          </div>
        </div>
        <div className='left_bot'>
          <div className='contents'>  
            <p>메일주소 : <Input onChange={(e)=>setEmail(e.target.value)} value={Email}/></p>
            <p>연락처 : <Input onChange={(e)=>setPhone(e.target.value)} value={phone}/></p>
            <p>주소 : <Input onChange={(e)=>setAddress(e.target.value)} value={address}/></p>
            <p>보호자 성함 : <Input onChange={(e)=>setParentsName(e.target.value)} value={parentsName}/></p>
            <p>보호자 관계 : <Input onChange={(e)=>setRelation(e.target.value)} value={relation}/></p>
            <p>보호자 연락처: <Input onChange={(e)=>setParentsPhone(e.target.value)} value={parentsPhone}/></p>
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
        <Button onClick={()=>{onSubmit()}} className='go_save'>
          저장
        </Button>
      </div>
  </div>
  );
};

export default ModalUpdate;

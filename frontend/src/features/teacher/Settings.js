import { Button,Text,Input } from '@chakra-ui/react'
import React,{useState} from 'react'
import './scss/setting.scss'
import axios from 'axios'
import { serverUrl,setToken } from '../../components/TOKEN'

const Settings = ({user,setUser}) => {
  const [imgBase64,setImagbase64] = useState(user.userProfile) // 파일 base64
  const onSubmit = () =>{
    const data ={...user,"userProfile":imgBase64}
    axios({
      url:`${serverUrl}/v1/users/update`,
      method:"PUT",
      headers:setToken(),
      data,
    })
    .then(res=>{
      localStorage.user = JSON.stringify(data)
      setUser(data)
    })
    .catch(err=>console.log(err))
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
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
    }
  };
  return (
    <div className='setting_box'>
      <div className=''>
        <img alt='선생님' className='teacher_img' src={imgBase64} />
        <label htmlFor="input-file" className="input-file-button" onChange={handleChangeFile}>
          사진 업로드
        </label>
        <Input type="file" onChange={handleChangeFile}  id="input-file" style={{display:"none"}}/>
        <Button onClick={()=>{onSubmit()}}>저장</Button>
        <Text> 이름 : {user.userName} </Text>
        <Text> {user.roomGrade}학년 {user.roomNum}반 </Text>
        <Text> 아이디 : {user.userId} </Text>
        <Text> 이름 : {user.userName} </Text>
        <Text>비밀번호 변경</Text>
      </div>
    </div>
  )
}

export default Settings

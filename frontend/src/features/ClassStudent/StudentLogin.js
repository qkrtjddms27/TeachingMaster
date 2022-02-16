import { Button, FormLabel, Image, Input } from '@chakra-ui/react';
import './scss/StudentLogin.scss'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../../components/TOKEN';
import { useEffect } from 'react';
import AlertDialogModal from '../../components/AlertModal';

const StudentLogin = ({student, setStudent, setHeader}) => {
  useEffect(()=>{
    setHeader(false)
  },[])
  const history = useHistory()
  const [studentId, setStudentId] = useState('')
  const [studentName, setStudentName] = useState('')
  const [isOpenId, setIsOpenId] = useState(false)
  const [isOpenName, setIsOpenName] = useState(false)

  const enterStudentClass = (e) => {
    e.preventDefault()
    // axios 요청으로 studentId(학번)를 보내 학생정보 받아오기
    axios({
      url: `${serverUrl}/student/${studentId}`,
      method: 'GET',
    })
    .then(({data}) => {
      // console.log(data)
      if (data.studentName === studentName) {
        setStudent({...data, studentId: studentId})
        localStorage.setItem('student', JSON.stringify({...data, studentId: studentId}))
        history.push('/class/student')
      } else {
        setIsOpenName(true)
        setStudentName('')
      }
    })
    .catch(() => {
      setIsOpenId(true)
      setStudentId('')
      setStudentName('')
    })
  }

  return (
    <div className='student_login'>
      <AlertDialogModal isCentered={true} title="학번이 맞지 않아요" content="학번을 모르겠으면 선생님께 연락하세요!" isOpen={isOpenId} setIsOpen={setIsOpenId} />
      <AlertDialogModal isCentered={true} title="땡!" content="학번과 이름을 확인하고 다시 입력해주세요" isOpen={isOpenName} setIsOpen={setIsOpenName} />
      <div className='box'>
        <div className='left'>
          <Image className='penguin' src="https://cdn.discordapp.com/attachments/885744368399560725/940498613614805022/be64e7a5abcb6882.png" />
        </div>
        <form className='right' onSubmit={(e) => enterStudentClass(e)}>
          <div className='form  '>
            <FormLabel htmlFor='studentId' autoFocus={true}>학번</FormLabel>
            <Input id='studentId' value={studentId} onChange={(e) => {setStudentId(e.target.value)}} />
          </div>
          <div className='form'>
            <FormLabel htmlFor='studentName'>이름</FormLabel>
            <Input id='studentName' value={studentName} onChange={(e) => {setStudentName(e.target.value)}}/>
          </div>
          <div className='btn'>
            <Button colorScheme='linkedin' onClick={(e) => enterStudentClass(e)}>확인</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
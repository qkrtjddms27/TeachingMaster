import { Button, FormControl, FormLabel, Image, Input, InputGroup, Select } from '@chakra-ui/react';
import './scss/StudentLogin.scss'
import penguin from './image/펭귄.png'
import { roomData } from '../../components/TOKEN';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { serverUrl, setToken } from '../../components/TOKEN';

const StudentLogin = () => {
  const history = useHistory()
  const [studentId, setStudentId] = useState('')
  const [grade, setGrade] = useState('')
  const [group, setGroup] = useState('')
  // 숫자 하나 넣으면 배열 return하는 함수
  const range = (size) => Array.from({length: size}, (_, index) => index + 1)
  const enterStudentClass = () => {
    console.log('studentId:', studentId)
    console.log('학년:', grade, '반: ', group)
    // axios 요청으로 studentId(학번)를 보내 학생정보 받아오기
    axios({
      url: `${serverUrl}/student/${studentId}`,
      method: 'GET',
      // 나중에 토큰 지우기!!!!
      headers: setToken(),
    })
    .then(({data}) => {
      // console.log(data)
      localStorage.setItem('student', JSON.stringify(data))
    })
    .catch(err => console.log(err))
    history.push('/class/student')
  }

  return (
    <div className='student_login'>
      <div className='box'>
        <div className='left'>
          <Image className='penguin' src={penguin} />
        </div>
        <div className='right'>
          <div className='id'>
            <FormLabel htmlFor='student_id'>학번</FormLabel>
            <Input id='student_id' value={studentId} onChange={(e) => {setStudentId(e.target.value)}} />
          </div>
          <div className='grade_room'>
            <div>
              <FormLabel htmlFor='student_grade'>학년</FormLabel>
              <Select id='student_grade' placeholder='학년' onChange={(e) => setGrade(e.target.value)}>
                {[1, 2, 3, 4, 5, 6].map(v => (
                  <option key={v} value={v}>{v}학년</option>
                ))}
              </Select>
            </div>
            <div>
              <FormLabel htmlFor='student_group'>반</FormLabel>
              <Select id='student_group' placeholder='반' onChange={(e) => setGroup(e.target.value)}>
                {range(roomData['ban'][grade-1]).map(v => (
                  <option key={v} value={v}>{v}반</option>
                ))}
              </Select>
            </div>
            <Button colorScheme='linkedin' onClick={enterStudentClass}>확인</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
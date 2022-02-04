import { Button, FormControl, FormLabel, Image, Input, InputGroup, Select } from '@chakra-ui/react';
import './scss/StudentLogin.scss'
import penguin from './image/펭귄.png'
import { roomData } from '../../components/TOKEN';
import { useState } from 'react';

const StudentLogin = () => {
  const [studentId, setStudentId] = useState('')
  const [grade, setGrade] = useState('')
  const [group, setGroup] = useState('')
  // 숫자 하나 넣으면 배열 return하는 함수
  const range = (size) => Array.from({length: size}, (_, index) => index + 1)
  const enterStudentClass = () => {
    console.log('studentId:', studentId)
    console.log('학년:', grade, '반: ', group)
  }

  return (
    <div className='student_login'>
      <div className='box'>
        <div className='left'>
          <Image className='penguin' src={penguin} />
        </div>
        <div className='right'>
          <div className='id'>
            <FormLabel htmlFor='student_id'>아이디</FormLabel>
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
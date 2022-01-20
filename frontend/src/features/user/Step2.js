import { Stack, Button, Box, Text, FormControl, InputGroup, Input, 
  InputRightElement, FormLabel, RadioGroup, Radio, Select } from '@chakra-ui/react';
import { useState } from 'react';
import './Signup.scss'


// 학교코드 & 담임여부(학년, 반) 페이지
const Step2 = ({ step, setStep }) => {
  const [schoolCode, setSchoolCode] = useState('')
  const [isClassTeacher, setIsClassTeacher] = useState('1')
  const [grade, setGrade] = useState('')
  const [group, setGroup] = useState('')

  // 숫자 하나 넣으면 배열 return하는 함수
  const range = (size) => Array.from({length: size}, (_, index) => index + 1)

  // 학교코드 보내면 그 학교의 학년, 반 정보 받아오는 부분
  const [banInfo, setBanInfo] = useState([])
  const handleSchoolCheck = () => {
    console.log(schoolCode, '담아서 back으로 요청')
    // 대충 이렇게 받아온다면 banInfo에 그대로 넣어준다 -> 나중에 꺼내쓴다
    const data = {'ban': [5, 4, 10, 3, 6, 4]}
    console.log(data['ban'])
    console.log('학년별 몇반까지 있는가')
    setBanInfo(data['ban'])
  }
  
  // 학교 인증 했으면 다음 페이지로
  const onClickHandle = () => {
    setStep(step + 1)
  }


  return (
    <div className='step2'>
      <Stack className='step2-stack'  direction='row' h='100px'>
        <form className='lr'>
          {/* 학교코드 */}
          <FormControl isRequired>
            <FormLabel>School Code</FormLabel>
            <InputGroup>
              <Input type="text" placeholder="School Code" onChange={(e) => setSchoolCode(e.target.value)} value={schoolCode} autoFocus />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleSchoolCheck}>확인</Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Box className='step2-line' />

          {/* 담임 여부 */}
          <RadioGroup defaultValue='1' onChange={setIsClassTeacher} value={isClassTeacher}>
            <Text>담임인가요?</Text>
            <Radio colorScheme='red' value='1'>No</Radio>
            <Radio colorScheme='green' value='2'>Yes</Radio>
          </RadioGroup>
          {/* 담임이면 보이는 학년, 반 선택 */}
          {isClassTeacher === '2' ? (
            <FormControl isRequired>
              <Select id='grade' placeholder='학년' variant='flushed' onChange={(e) => setGrade(e.target.value)}>
                <option value='1'>1학년</option>
                <option value='2'>2학년</option>
                <option value='3'>3학년</option>
                <option value='4'>4학년</option>
                <option value='5'>5학년</option>
                <option value='6'>6학년</option>
              </Select>
              <Select id='group' placeholder='반' variant='flushed' onChange={(e) => setGroup(e.target.value)}>
                {range(banInfo[grade-1]).map((gp) => (
                  <option value={gp} key={gp}>{gp}반</option>
                ))}
              </Select>
            </FormControl>
          ) : null}




        </form>
      </Stack>
      <Stack className='step2-stack'>
        <div className='step-button'>
          <Button borderRadius={0} variant="solid" className='prev-button' 
            bgColor="#B5A18C" colorScheme="#c7baac" width="48%" onClick={() => setStep(step-1)}
          >이전</Button>
          <Button borderRadius={0} variant="solid" className="next-button" 
            bgColor="#7e5526" colorScheme="#472b0a" width="48%" onClick={onClickHandle}
          >다음</Button>
        </div>
      </Stack>
    </div>
  );
};

export default Step2;
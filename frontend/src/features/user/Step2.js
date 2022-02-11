import { Stack, Button, Box, Text, FormControl, InputGroup, Input, 
  InputRightElement, FormLabel, Select, Switch  } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import './scss/Signup.scss'
import AlertDialogModal from '../../components/AlertModal';
import { roomData } from '../../components/TOKEN';


// 학교코드 & 담임여부(학년, 반) 페이지
const Step2 = ({ step, setStep, isClassTeacher, setIsClassTeacher, grade, setGrade, group, setGroup }) => {
  // 숫자 하나 넣으면 배열 return하는 함수
  const range = (size) => Array.from({length: size}, (_, index) => index + 1)

  // 학교코드 보내면 그 학교의 학년, 반 정보 받아오는 부분 / 빈코드를 입력하면 경고창
  const [schoolCode, setSchoolCode] = useState('')
  const [chkSchool, setChkSchool] = useState(false)
  const [openChkSchool, setOpenChkSchool] = useState(false)

  // 학교코드 확인버튼
  const handleSchoolCheck = (e) => {
    e.preventDefault()
    if (schoolCode.length) {
      // roomData 받아오기
      console.log('axios - check schoolCode:',schoolCode)
      setChkSchool(true)
    } else {
      setOpenChkSchool(true)
    }
  }

  const [chkG, setChkG] = useState(false)
  // 다음버튼
  const onClickHandle = () => {
    if (!chkSchool) {
      setOpenChkSchool(true)
    } else if (isClassTeacher) {
      if (!grade) {
        setChkG(true)
      } else if (!group) {
        setChkG(true)
      } else {
        console.log(grade+'학년'+group+'반 담임')
        setStep(step+1)
      }
    } else {
      console.log('담임아님')
      setStep(step+1)
    }
  }

  // 학교코드 인증 안했는데 담임체크하려고 하면 튕기기
  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else if (!chkSchool) {
      setOpenChkSchool(true)
    }
  }, [isClassTeacher])


  return (
    <div className='step2'>
      <AlertDialogModal title="학교 코드를 확인하세요" content="학교 코드를 입력하고, 확인 버튼을 눌러 학교를 인증해주세요" isOpen={openChkSchool} setIsOpen={setOpenChkSchool} />
      <AlertDialogModal title="담임이네요?" content="학년과 반을 입력해주세요" isOpen={chkG} setIsOpen={setChkG} />
      <Stack className='step2-stack1'  direction='row' h='100px'>
        {/* 학교코드 */}
        <FormControl className='step2-form1'>
          <FormLabel>School Code</FormLabel>
          <InputGroup className='step2-input'>
            <Input type="text" placeholder="School Code" onChange={(e) => setSchoolCode(e.target.value)} value={schoolCode} autoFocus />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" type='submit' onClick={handleSchoolCheck}>확인</Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Box className='step2-line' />
        {/* 담임, 학년, 반 */}
        <FormControl className='step2-form2'>
          {/* 담임 switch */}
          <div className='step2-isclass'>
            <Text>담임인가요?</Text>
            <Switch className='step2-switch' colorScheme='cyan' onChange={(e) => setIsClassTeacher(e.target.checked)}></Switch>
          </div>
          {/* 학년, 반 select */}
          {isClassTeacher ? (
          <FormControl isRequired className='step2-selects'>
            <Select className='step2-grade' placeholder='학년' variant='flushed' onChange={(e) => setGrade(e.target.value)}>
              <option value='1'>1학년</option>
              <option value='2'>2학년</option>
              <option value='3'>3학년</option>
              <option value='4'>4학년</option>
              <option value='5'>5학년</option>
              <option value='6'>6학년</option>
            </Select>
            <Select id='group' placeholder='반' variant='flushed' onChange={(e) => setGroup(e.target.value)}>
              {range(roomData['ban'][grade-1]).map((gp) => (
                <option value={gp} key={gp}>{gp}반</option>
                ))}
            </Select>
          </FormControl>
          ) : null}
        </FormControl>
      </Stack>
      <Stack className='step2-stack2'>
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
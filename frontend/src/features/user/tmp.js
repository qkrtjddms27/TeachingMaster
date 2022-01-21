import { useState, useEffect } from "react";
import { 
  Flex, Heading, Text, Input, Button, InputGroup, Stack, Box, Select, Avatar, FormControl, 
  InputRightElement, Spacer, RadioGroup, Radio } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AlertDialogModal from "../../components/AlertModal";

// 사진 불러오기
// 제출버튼 누르면 요청보내고 응답받고 그에 맞게 분기 나눠서 처리

const Signup = () => {

  // 숫자 하나 넣으면 배열 return하는 함수
  const range = (size) => {
    return Array.from({length: size}, (_, index) => index + 1)
  }

  // password, confirmPassword 보일지 말지 결정하는 부분
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  useEffect(() => {
    setShowPassword(false)
    setShowConfirmPassword(false)
    setIsClassTeacher('1')
  }, [])

  // input태그에 들어오는 user 정보로 업데이트: 학교코드, 아이디, 비번, 비번확인, 담임여부, 학년, 반, 사진
  const [schoolCode, setSchoolCode] = useState('')
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [confirmUserPassword, setConfirmUserPassword] = useState('')
  const [isClassTeacher, setIsClassTeacher] = useState('1')
  const [grade, setGrade] = useState('')
  const [group, setGroup] = useState('')
  // const [pic, setPic] = useState('')

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

  // 비번과 비번확인이 같은지 다른지
  const [isSame, setIsSame] = useState(false)
  useEffect((e) => {
    if (userPassword === confirmUserPassword) {
      setIsSame(true)
    } else {
      setIsSame(false)
    }
  }, [userPassword, confirmUserPassword])

  // 제출버튼 눌렀는데 비밀번호 다를때 쓸 모달이 open인지 close인지
  const [isOpen, setIsOpen] = useState(false)

  // 제출
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSame) {
      let data
      if (isClassTeacher === '2') {
        console.log('담임O')
        data = { schoolCode, userId, userPassword, isClassTeacher, grade, group }
      } else {
        console.log('담임X')
        data = { schoolCode, userId, userPassword, isClassTeacher }
      }
      console.log(data)
      // data 담아서 회원가입 요청보내고
      // 회원가입 완료 응답 제대로 오면
      // state 비우고
      // 로그인 페이지로 넘기기
    } else{
      setIsOpen(true)
      // <Input> 비울까?말까?
    }
  }


  return (
    <Flex className="login-flex">
      <AlertDialogModal title="다시 입력하세요" content="비밀번호와 비밀번호확인 다릅니다" isOpen={isOpen} setIsOpen={setIsOpen} />
      <Spacer/>
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center" >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Teaching Master</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" >
              {/* 학교코드 */}
              <FormControl isRequired>
                <InputGroup>
                  <Input type="text" placeholder="School Code" onChange={(e) => setSchoolCode(e.target.value)} value={schoolCode} autoFocus />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleSchoolCheck}>확인</Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* 아이디 */}
              <FormControl isRequired>
                <InputGroup>
                  <Input type="text" placeholder="ID" onChange={(e) => setUserId(e.target.value)} value={userId} />
                </InputGroup>
              </FormControl>
              {/* 비번 */}
              <FormControl isRequired>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setUserPassword(e.target.value)} value={userPassword}/>
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onMouseEnter={handleShowPassword} onMouseLeave={handleShowPassword}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* 비번확인 */}
              <FormControl isRequired>
                <InputGroup>
                  <Input focusBorderColor={isSame ? 'lime' : 'crimson'} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" onChange={(e) => setConfirmUserPassword(e.target.value)} value={confirmUserPassword}/>
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onMouseEnter={handleShowConfirmPassword} onMouseLeave={handleShowConfirmPassword}>
                      {showConfirmPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* 담임 여부 */}
              <RadioGroup defaultValue='1' onChange={setIsClassTeacher} value={isClassTeacher}>
                <Stack spacing={5} direction='row'>
                  <Text>담임인가요?</Text>
                  <Radio colorScheme='red' value='1'>
                    No
                  </Radio>
                  <Radio colorScheme='green' value='2'>
                    Yes
                  </Radio>
                </Stack>
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
              <Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full" >
                SignUp
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box color="teal.500">
        <Link to="/login">
          Login?
        </Link>
      </Box>
      <Spacer/>
    </Flex>
  );
};

export default Signup;

import { useState, useEffect } from "react";
import { Flex, Heading, Text, Input, Button, InputGroup, Stack, Box, Link, Avatar, FormControl, InputRightElement, Spacer, RadioGroup, Radio } from "@chakra-ui/react";

// 담임유무 Yes면 학년, 반 선택버튼 뜨게하기
// 등록버튼 누르면 유효한지(비밀번호 같은가? 빈칸 없는가?) 확인 -> 유효하지 않으면 alert
const Signup = () => {
  // password, confirmPassword 보일까? 말까?
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  useEffect(() => {
    setShowPassword(false)
    setShowConfirmPassword(false)
  }, [])


  // input태그에 들어오는 user 정보로 업데이트: 학교코드, 아이디, 비번, 비번확인, 담임여부, 학년, 반, 사진
  const [schoolCode, setSchoolCode] = useState('')
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [confirmUserPassword, setConfirmUserPassword] = useState('')
  const [isClassTeacher, setIsClassTeacher] = useState('1')
  const [grade, setGrade] = useState('')
  const [group, setGroup] = useState('')
  const [pic, setPic] = useState('')


  useEffect(() => {
    console.log('담임인가?', isClassTeacher)
    if (isClassTeacher === '2') {
      // 학년 반 선택하는거 보이게
    } else {
      // 학년 반 선택하는거 안보이게
    }
  }, [isClassTeacher])


  // // 비번과 비번확인이 같은가? 다른가?
  // const [borderColor, setBorderColor] = useState('')
  // useEffect((e) => {
  //   if (userPassword === confirmUserPassword) {
  //     setBorderColor(true)
  //   } else {
  //     setBorderColor(false)
  //   }
  // }, [userPassword, confirmUserPassword])


  // 제출
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userId, userPassword)
    // if (isSame) {
    //   console.log(userId, userPassword)
    //   setSchoolCode("")
    //   setUserId("")
    //   setUserPassword("")
    //   setConfirmUserPassword("")
    //   setIsClassTeacher("")
    //   setGrade("")
    //   setGroup("")
    //   setPic("")
    // } else{
    //   console.log('비밀번호 틀림!')
    // }
  }


  return (
    <Flex className="login-flex">
      <Spacer/>
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center" >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" >
              {/* 학교코드 */}
              <FormControl>
                <InputGroup>
                  <Input type="text" placeholder="School Code" onChange={(e) => setSchoolCode(e.target.value)} value={schoolCode} />
                </InputGroup>
              </FormControl>
              {/* 아이디 */}
              <FormControl>
                <InputGroup>
                  <Input type="text" placeholder="ID" onChange={(e) => setUserId(e.target.value)} value={userId} />
                </InputGroup>
              </FormControl>
              {/* 비번 */}
              <FormControl>
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
              <FormControl>
                <InputGroup>
                  <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" onChange={(e) => setConfirmUserPassword(e.target.value)} value={confirmUserPassword}/>
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



              <Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full" >
                SignUp
              </Button>




            </Stack>
          </form>
        </Box>




      </Stack>
      <Spacer/>
    </Flex>
  );
};

export default Signup;
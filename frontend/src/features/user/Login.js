import { useState, useEffect } from "react";
import { Flex, Text, Input, Button, InputGroup, Stack, Box, InputLeftElement, FormControl, InputRightElement, Spacer, chakra, Image, Heading, FormLabel } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa"
import './Login.scss'
import tmlogo from './data-protection.png'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const Login = () => {
  // password 보일까? 말까?
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  useEffect(() => {
    setShowPassword(false)
  }, [])

  // input태그에 들어오는 user 정보로 업데이트
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const onChangeId = (e) => setUserId(e.target.value)
  const onChangePassword = (e) => setUserPassword(e.target.value)

  // 제출
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userId, userPassword)
    setUserId("")
    setUserPassword("")
  }


  return (
    <Flex className="login-flex">
      <Spacer/>
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center" >
          <form onSubmit={handleSubmit} className="login-justify-center">
            <Stack spacing={4} className="login-form">
              {/* <Image src={tmlogo}/> */}
              <Heading>Login</Heading>
              <Text color="black" className="login-title">티칭마스터의 다양한 서비스를 누려보세요</Text>
              <Spacer/>
              <FormControl>
                <InputGroup>
                  {/* <FormLabel>ID</FormLabel> */}
                  <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
                  <Input type="text" placeholder="아이디" onChange={onChangeId} value={userId} focusBorderColor="#B5A18C" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  {/* <FormLabel>Password</FormLabel> */}
                  <InputLeftElement pointerEvents="none" children={<CFaLock color="gray.300" />} />
                  <Input type={showPassword ? "text" : "password"} placeholder="비밀번호" onChange={onChangePassword} value={userPassword}  focusBorderColor="#B5A18C" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onMouseEnter={handleShowClick} onMouseLeave={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Spacer/>
              <Button borderRadius={0} type="submit" variant="solid" width="full" textColor="#F8F8F8" className="login-button" bgColor="#B5A18C" colorScheme="#5B360D">
                로그인
              </Button>
              <Box color="#B5A18C" className="login-justify-center">
                <Link className="login-link" to="/signup">회원가입</Link>
              </Box>
            </Stack>
          </form>
      </Stack>
      <Spacer/>
    </Flex>
  );
};

export default Login;
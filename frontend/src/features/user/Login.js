import { useState, useEffect } from "react";
import { Flex, Heading, Input, Button, InputGroup, Stack, Box, Link, Avatar, FormControl, InputRightElement, Spacer } from "@chakra-ui/react";
import './Login.scss'


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
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Teaching Master</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" >
              <FormControl>
                <InputGroup>
                  <Input type="text" placeholder="ID" onChange={onChangeId} value={userId} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} placeholder="Password" onChange={onChangePassword} value={userPassword}/>
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onMouseEnter={handleShowClick} onMouseLeave={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full" >
                SignUp
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" to="/signup">
          회원가입
        </Link>
      </Box>
      <Spacer/>
    </Flex>
  );
};

export default Login;
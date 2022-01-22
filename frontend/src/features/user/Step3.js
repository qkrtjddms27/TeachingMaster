import { Button, FormControl, InputGroup, Input, InputRightElement, Stack, FormLabel } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import AlertDialogModal from '../../components/AlertModal';


// 이름, 아이디, 비번, 비번확인 페이지
const Step3 = ({ step, setStep }) => {

  // password, confirmPassword 보일지 말지 결정하는 부분
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const [isSame, setIsSame] = useState(false)
  useEffect(() => {
    setShowPassword(false)
    setShowConfirmPassword(false)
    setIsSame(false)
  }, [])

  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [confirmUserPassword, setConfirmUserPassword] = useState('')

  // 비번과 비번확인이 같은지 다른지
  useEffect(() => {
    if (userPassword === confirmUserPassword) {
      setIsSame(true)
    } else {
      setIsSame(false)
    }
  }, [userPassword, confirmUserPassword])

  // 제출버튼 눌렀는데 아이디 입력, 비밀번호 체크
  const [naemCheck, setNameCheck] = useState(false)
  const [idCheck, setIdCheck] = useState(false)
  const [passwordErr, setpasswordErr] = useState(false)

  // 제출
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userName) {
      setNameCheck(true)
    } else if (!userId) {
      setIdCheck(true)
    } else if (!isSame || !userPassword) {
      setpasswordErr(true)
      setUserPassword('')
      setConfirmUserPassword('')
    } else {
      setStep(step+1)
    }
  }


  return (
    <div>
      <AlertDialogModal title="다시 입력하세요" content="이름을 입력해주세요" isOpen={naemCheck} setIsOpen={setNameCheck} />
      <AlertDialogModal title="다시 입력하세요" content="아이디를 입력해주세요" isOpen={idCheck} setIsOpen={setIdCheck} />
      <AlertDialogModal title="다시 입력하세요" content="비밀번호를 다시 입력해주세요" isOpen={passwordErr} setIsOpen={setpasswordErr} />
      <form onSubmit={handleSubmit}>
        <div className='step3-form'>
          {/* 이름 */}
          <FormControl className='step3-name-form'>
            <FormLabel>이름</FormLabel>
            <InputGroup>
              <Input type="text" placeholder="Name" onChange={(e) => setUserName(e.target.value)} value={userName} />
            </InputGroup>
          </FormControl>
          {/* 아이디 */}
          <FormControl>
            <FormLabel>아이디</FormLabel>
            <InputGroup>
              <Input type="text" placeholder="ID" onChange={(e) => setUserId(e.target.value)} value={userId} />
            </InputGroup>
          </FormControl>
          {/* 비번 */}
          <FormControl className='step3-password-form'>
            <FormLabel>비밀번호</FormLabel>
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
            <FormLabel>비밀번호 확인</FormLabel>
            <InputGroup>
              <Input focusBorderColor={isSame ? 'lime' : 'crimson'} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" onChange={(e) => setConfirmUserPassword(e.target.value)} value={confirmUserPassword}/>
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onMouseEnter={handleShowConfirmPassword} onMouseLeave={handleShowConfirmPassword}>
                  {showConfirmPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </div>
        <Stack className='step3-last'>
          <div className='step-button'>
            <Button borderRadius={0} variant="solid" className='prev-button' 
              bgColor="#B5A18C" colorScheme="#c7baac" width="48%" onClick={() => setStep(step-1)}
            >이전</Button>
            <Button borderRadius={0} variant="solid" className="next-button" type="submit"
              bgColor="#7e5526" colorScheme="#472b0a" width="48%" onClick={handleSubmit}
            >제출</Button>
          </div>
        </Stack>
      </form>
    </div>
  );
};

export default Step3;
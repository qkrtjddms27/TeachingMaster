import { Stack, Button, FormControl, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import AlertDialogModal from '../../components/AlertModal';


// 아이디, 비번, 비번확인 페이지
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

  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [confirmUserPassword, setConfirmUserPassword] = useState('')

  // 비번과 비번확인이 같은지 다른지
  useEffect((e) => {
    if (userPassword === confirmUserPassword) {
      setIsSame(true)
    } else {
      setIsSame(false)
    }
  }, [userPassword, confirmUserPassword])

  // 제출버튼 눌렀는데 아이디 입력, 비밀번호 체크
  const [idCheck, setIdCheck] = useState(false)
  const [passwordErr, setpasswordErr] = useState(false)

  // 제출
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userId) {
      setIdCheck(true)
    } else if (!isSame) {
      setpasswordErr(true)
    } else {
      setStep(step+1)
    }
    // <Input> 비울까?말까?
  }

  // let data
  // if (isClassTeacher) {
  //   console.log('담임O')
  //   data = { schoolCode, userId, userPassword, isClassTeacher, grade, group }
  // } else {
  //   console.log('담임X')
  //   data = { schoolCode, userId, userPassword, isClassTeacher }
  // }
  // console.log(data)
  // data 담아서 회원가입 요청보내고
  // 회원가입 완료 응답 제대로 오면
  // state 비우고
  // 로그인 페이지로 넘기기

  return (
    <div>
      <AlertDialogModal title="다시 입력하세요" content="아이디를 입력해주세요" isOpen={idCheck} setIsOpen={setIdCheck} />
      <AlertDialogModal title="다시 입력하세요" content="비밀번호와 비밀번호확인 다릅니다" isOpen={passwordErr} setIsOpen={setpasswordErr} />
      <form onSubmit={handleSubmit}>
          {/* 아이디 */}
          <FormControl>
            <InputGroup isRequired>
              <Input type="text" placeholder="ID" onChange={(e) => setUserId(e.target.value)} value={userId} isRequired />
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
              <Input focusBorderColor={isSame ? 'lime' : 'crimson'} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" onChange={(e) => setConfirmUserPassword(e.target.value)} value={confirmUserPassword}/>
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onMouseEnter={handleShowConfirmPassword} onMouseLeave={handleShowConfirmPassword}>
                  {showConfirmPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <div className='step-button'>
            <Button borderRadius={0} variant="solid" className='prev-button' 
              bgColor="#B5A18C" colorScheme="#c7baac" width="48%" onClick={() => setStep(step-1)}
            >이전</Button>
            <Button borderRadius={0} variant="solid" className="next-button" type="submit"
              bgColor="#7e5526" colorScheme="#472b0a" width="48%" onClick={handleSubmit}
            >제출</Button>
          </div>
      </form>
    </div>
  );
};

export default Step3;
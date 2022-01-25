import React, { useState } from 'react';
import { Box, Text, Checkbox, Stack, Button } from '@chakra-ui/react';
import './scss/Signup.scss'
import AlertDialogModal from '../../components/AlertModal';


// 약관동의 페이지
const Step1 = ({ step, setStep }) => {
  const [checkedItems, setCheckedItems] = useState([false, false])
  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  const content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  // 다음버튼 눌렀는데 비밀번호 다를때 쓸 모달이 open인지 close인지
  const [isOpen, setIsOpen] = useState(false)
  const onClickHandle = () => {
    if (allChecked) {
      setStep(step + 1)
    } else {
      setIsOpen(true)
    }
  }


  return (
    <div>
      <AlertDialogModal isCentered={true} title="동의가 필요합니다" content="필수 이용약관에 동의하지 않으면 서비스 제한이 있습니다" isOpen={isOpen} setIsOpen={setIsOpen} />
      <Stack className='step1-stack'>
        <Box className='step1-first'>
          <Text>홈페이지 이용약관</Text>
          <Checkbox isChecked={allChecked} isIndeterminate={isIndeterminate} 
            onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
          >
            약관에 모두 동의합니다.
          </Checkbox>
        </Box>
        <Box className='step1-content'>
          {content}{content}{content}
        </Box>
        <Box className='step1-chk-box'>
          <Checkbox isChecked={checkedItems[0]} onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}>
            (필수)홈페이지 이용약관에 동의합니다.
          </Checkbox>
        </Box>
      </Stack>
      <Stack className='step1-stack'>
        <Box>
          <Text>개인정보 수집 및 이용 안내</Text>
        </Box>
        <Box className='step1-content'>
          {content}{content}{content}
        </Box>
        <Box className='step1-chk-box'>
          <Checkbox isChecked={checkedItems[1]} onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
          >(필수)개인정보 수집 및 이용 안내에 동의합니다.</Checkbox>
        </Box>
      </Stack>
      <Stack className='step1-stack'>
        <Text>※ 홈페이지 이용약관, 개인정보 수집 및 이용안내에 동의하지 않으실 경우 회원가입이 제한됩니다.</Text>
        <div className='step-button'>
          {/* <Button borderRadius={0} variant="solid" className='prev-button' 
            bgColor="#B5A18C" colorScheme="#c7baac" width="48%"
          >이전</Button> */}
          <Button borderRadius={0} variant="solid" className="next-button" 
            bgColor="#7e5526" colorScheme="#472b0a" width="48%" onClick={onClickHandle}
          >다음</Button>
        </div>
      </Stack>
    </div>
  );
};

export default Step1;
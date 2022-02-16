import React, { useState } from 'react';
import { Box, Text, Checkbox, Stack, Button } from '@chakra-ui/react';
import './scss/Signup.scss'
import AlertDialogModal from '../../components/AlertModal';


// 약관동의 페이지
const Step1 = ({ step, setStep }) => {
  const [checkedItems, setCheckedItems] = useState([false, false])
  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

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
      <AlertDialogModal  title="동의가 필요합니다" content="필수 이용약관에 동의하지 않으면 서비스 제한이 있습니다" isOpen={isOpen} setIsOpen={setIsOpen} />
      <Stack className='step1-stack'>
        <Box className='step1-first'>
          <Text>Teaching Master 이용약관</Text>
          <Checkbox isChecked={allChecked} isIndeterminate={isIndeterminate} 
            onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
          >
            약관에 모두 동의합니다.
          </Checkbox>
        </Box>
        <Box className='step1-content'>
          <p>Teaching Master는 (이하 ‘TM’이라 칭함) 「개인정보보호법」, 「정보통신망 이용촉진 및 정보보호에 관한 법률」을 준수하고 있으며, 정보주체의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 정보주체의 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보 취급방침을 제정하고 이를 준수하고 있습니다.</p>
          <br />
          <p>TM의 "개인정보 취급방침"은 관련 법률 및 지침의 변경 또는 내부운영 방침의 변경에 따라 변경 될 수 있습니다. TM의 "개인정보 취급방침"이 변경될 경우 관련 사항을 홈페이지(https://i6e107.p.ssafy.io) 를 통하여 공지합니다.</p>
        </Box>
        <Box className='step1-chk-box'>
          <Checkbox isChecked={checkedItems[0]} onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}>
            (필수)홈페이지 이용약관에 동의합니다.
          </Checkbox>
        </Box>
      </Stack>
      <Stack className='step1-stack'>
        <Box>
          <Text>개인정보 수집 및 이용</Text>
        </Box>
        <Box className='step1-content'>
          <p>본 개인정보처리방침은 Teaching Master(https://i6e107.p.ssafy.io) (이하 ‘TM’이라 칭함)에 적용됩니다.</p>
          <p>이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 정하여 운영하고 있습니다.</p>
          <p>TM은 개인정보처리방침을 통하여 고객님이 제공하는 개인정보가 어떠한 용도와 방식으로 이용되며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다. TM은 개인정보처리방침을 개정하는 경우 공지사항 또는 개별공지를 통해 알려드릴 것입니다.</p>
          <br />
          <p style={{'fontWeight': 'bold'}}>1. 수집하는 개인정보 항목</p>
          <p style={{'marginLeft': '1rem'}}>TM은 회원가입, 원활한 서비스 제공 등을 위해 아래와 같이 개인정보를 수집하고 있습니다.</p>
          <p style={{'marginLeft': '1rem'}}>[학교코드, 로그인ID, 비밀번호, 성명]</p>
          <p style={{'fontWeight': 'bold'}}>2. 개인정보의 수집 및 이용목적</p>
          <p style={{'marginLeft': '1rem'}}>회사는 수집한 개인정보를 다음과 같은 목적으로만 활용합니다.</p>
          <p style={{'marginLeft': '1rem'}}>회원관리 측면에서 가입 의사 확인, 불만처리 등 민원 처리, 고지사항을 전달할 때 사용됩니다.</p>
          <p style={{'marginLeft': '1rem'}}>서비스 내에 회원정보를 표시할 경우, 예를 들어 고객님이 게시한 퀴즈를 표시 할 때나 교실을 열었을 때 고객님의 프로필이 표시될 수 있습니다.</p>
        </Box>
        <Box className='step1-chk-box'>
          <Checkbox isChecked={checkedItems[1]} onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
          >(필수)개인정보 수집 및 이용 안내에 동의합니다.</Checkbox>
        </Box>
      </Stack>
      <Stack className='step1-stack'>
        <Text>※ 홈페이지 이용약관, 개인정보 수집 및 이용안내에 동의하지 않으실 경우 회원가입이 제한됩니다.</Text>
        <div className='step-button'>
          <Button borderRadius={0} variant="solid" className="next-button" 
            bgColor="#7e5526" colorScheme="#472b0a" width="48%" onClick={onClickHandle}
          >다음</Button>
        </div>
      </Stack>
    </div>
  );
};

export default Step1;
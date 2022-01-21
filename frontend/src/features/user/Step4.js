import { useState } from 'react';
import { Stack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './Signup.scss'


// 회원가입이 완료되었습니다 페이지 -> 로그인 버튼 있으면 좋을듯?
const Step4 = ({ step,setStep }) => {
  return (
    <div>
      <Stack className='step3-stack2'>
        <div className='step-button'>
          {/* <Button borderRadius={0} variant="solid" className='prev-button' 
            bgColor="#B5A18C" colorScheme="#c7baac" width="48%" onClick={() => setStep(step-1)}
          ><Link to="/" className="step4-link">메인으로</Link></Button> */}
          <Button borderRadius={0} variant="solid" className='prev-button' 
            bgColor="#B5A18C" colorScheme="#c7baac" width="48%" onClick={() => setStep(step-1)}
          >이전</Button>
          <Button borderRadius={0} variant="solid" className="next-button" 
            bgColor="#7e5526" colorScheme="#472b0a" width="48%" onClick={() => setStep(step+1)}
          ><Link to="/login" className='step4-link'>로그인</Link></Button>
        </div>
      </Stack>
    </div>
  );
};

export default Step4;
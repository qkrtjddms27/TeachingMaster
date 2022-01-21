// import { useState } from 'react';
import { Stack, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './Signup.scss'
import imgSrc from './bunny.png'


// 회원가입이 완료되었습니다 페이지 -> 로그인 버튼 있으면 좋을듯?
const Step4 = ({ step,setStep }) => {
  return (
    <div className='step4'>
      <Stack className='step4-first'>
        <Image className='step4-img' src={imgSrc}/>
        <Text fontSize='3xl'>
          <span>사용자이름</span>님의 회원가입을 축하합니다!
        </Text>
        <Text fontSize='2xl'>Teaching Master의 서비스를 마음껏 누려보세요</Text>
      </Stack>
      <Stack className='step4-last'>
        <div className='step4-button'>

          <Link to="/" className='step4-link' id='step4-main'>
            메인으로
            {/* <Button borderRadius={0} variant="solid"
              bgColor="#B5A18C" colorScheme="#c7baac" width="48%"
            >메인으로</Button> */}
          </Link>
          <Link to="/login" className='step4-link' id='step4-login'>
            로그인
          </Link>
        </div>
      </Stack>
    </div>
  );
};

export default Step4;
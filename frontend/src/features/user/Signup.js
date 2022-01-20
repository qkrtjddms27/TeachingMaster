import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './Signup.scss'
import Step1 from './Step1'
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';


// 회원가입 전체페이지 -> 단계를 보여주고, 단계에 맞는 Step을 보여준다
const Signup = () => {
  const [step, setStep] = useState(1)

  return (
    <div className='signup-bg'>
      <div className='signup'>
        <ul className='signup-agreement'>
          <li className={step === 1 ? 'li-orange' : 'li-gray'}>
            <Text className='signup-p'>이용약관</Text>
          </li>
          <span>▶</span>
          <li className={step === 2 ? 'li-orange' : 'li-gray'}>
            <Text className='signup-p'>학교인증</Text>
          </li>
          <span>▶</span>
          <li className={step === 3 ? 'li-orange' : 'li-gray'}>
            <Text className='signup-p'>정보입력</Text>
          </li>
          <span>▶</span>
          <li className={step === 4 ? 'li-orange' : 'li-gray'}>
            <Text className='signup-p'>가입완료</Text>
          </li>
        </ul>
        {step === 1 ? ( <Step1 step={step} setStep={setStep} /> ) : null}
        {step === 2 ? ( <Step2 step={step} setStep={setStep} /> ) : null}
        {step === 3 ? ( <Step3 step={step} setStep={setStep} /> ) : null}
        {step === 4 ? ( <Step4 step={step} setStep={setStep} /> ) : null}
      </div>
    </div>
  );
};

export default Signup;
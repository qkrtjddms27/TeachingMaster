import './scss/Main1.scss'
import { Link } from 'react-router-dom';
const Main1 = () => {
  return (
    <div className='main1'>
      <div className='rainbow' id='rb1'>
        <div />    
        <div />
        <p className='rainbow-p'>티</p>
        <img className='rainbow-img1' src='https://i.ibb.co/cCDcZVk/1.png' alt='티랑' title='티랑'/>
      </div>
      <div className='rainbow' id='rb2'>
        <div />
        <div />
        <p className='rainbow-p'>칭</p>
        <img className='rainbow-img2' src='https://i.ibb.co/gSChcjb/1.png' alt='토토' title='토토'/>
      </div>
      <div className='rainbow' id='rb3'>
        <div />
        <div />
        <p className='rainbow-p'>마</p>
        <div className='icons'>
          <Link to="/class/student/login" > 
            <img className='rainbow-img' src='https://i.ibb.co/Nm4QdRb/1.png' alt='펭키' title='학생은 여기로'/>
          </Link>
          <div className='speech-bubble1'>
            <p>학생 로그인</p>
          </div>
        </div>
      </div>
      <div className='rainbow' id='rb4'>
        <div />
        <div />
        <p className='rainbow-p'>스</p>
        <img className='rainbow-img4' src='https://i.ibb.co/SPPx4bm/1.png' alt='디노' title='디노'/>
      </div>
      <div className='rainbow' id='rb5'>
        <div />
        <div />
        <p className='rainbow-p'>터</p>
        <div className='icons'>
        <Link to="/login" >
          <img className='rainbow-img' src='https://i.ibb.co/L8gSsGD/image-27.png' alt='마곰' title='교사는 여기로'/>
        </Link>
        <div className='speech-bubble2'>
            <p>선생님 로그인</p>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Main1;
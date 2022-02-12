import './scss/Main1.scss'
import { Link } from 'react-router-dom';
const Main1 = () => {
  return (
    <div className='main1'>
      <div className='rainbow' id='rb1'>
        <div />    
        <div />
        <p className='rainbow-p'>티</p>
        <img className='rainbow-img' src='https://i.ibb.co/cCDcZVk/1.png' alt='티랑' title='티랑'/>
      </div>
      <div className='rainbow' id='rb2'>
        <div />
        <div />
        <p className='rainbow-p'>칭</p>
        <img className='rainbow-img' src='https://i.ibb.co/gSChcjb/1.png' alt='토토' title='토토'/>
      </div>
      <div className='rainbow' id='rb3'>
        <div />
        <div />
        <p className='rainbow-p'>마</p>
        <Link to="/class/student/login" > 
          <img className='rainbow-img' src='https://i.ibb.co/Nm4QdRb/1.png' alt='펭키' title='학생은 여기로'/>
        </Link>
      </div>
      <div className='rainbow' id='rb4'>
        <div />
        <div />
        <p className='rainbow-p'>스</p>
        <img className='rainbow-img' src='https://i.ibb.co/SPPx4bm/1.png' alt='디노' title='디노'/>
      </div>
      <div className='rainbow' id='rb5'>
        <div />
        <div />
        <p className='rainbow-p'>터</p>
        <Link to="/login" >
          <img className='rainbow-img' src='https://i.ibb.co/L8gSsGD/image-27.png' alt='마곰' title='교사는 여기로'/>
        </Link>
      </div>
    </div>
  );
};

export default Main1;
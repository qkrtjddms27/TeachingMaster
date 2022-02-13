import './scss/Main1.scss'
import { Link } from 'react-router-dom';

const Main1 = () => {
  return (
    <div className='main1'>
      <div className='rainbow' id='rb1'>
        <div className='blank' />
        <p className='rainbow-p'>티</p>
        <div className='blank' />
        <img className='rainbow-img' style={{marginTop: "10rem"}} src='https://i.ibb.co/cCDcZVk/1.png' alt='티랑' title='티랑'/>
      </div>
      <div className='rainbow' id='rb2'>
        <div className='blank' />
        <p className='rainbow-p'>칭</p>
        <div className='blank' />
        <img className='rainbow-img' src='https://i.ibb.co/gSChcjb/1.png' alt='토토' title='토토'/>
      </div>
      <div className='rainbow' id='rb3'>
        <div className='blank' />
        <p className='rainbow-p'>마</p>
        <div className='blank' />
        <Link to="/class/student/login" > 
          <div className='speech-bubble'>
            <p>학생인 친구들은<br/>나를 눌러줘</p>
          </div>
          <img className='rainbow-img' src='https://i.ibb.co/Nm4QdRb/1.png' alt='펭키' title='펭키'/>
        </Link>
      </div>
      <div className='rainbow' id='rb4'>
        <div className='blank' />
        <p className='rainbow-p'>스</p>
        <div className='blank' />
        <img className='rainbow-img' style={{width: "12vw", height: "20vh"}} src='https://i.ibb.co/SPPx4bm/1.png' alt='디노' title='디노'/>
      </div>
      <div className='rainbow' id='rb5'>
        <div className='blank' />
        <p className='rainbow-p'>터</p>
        <div className='blank' />
        <Link to="/login" >
          <div className='speech-bubble'>
              <p>교사인 친구들은<br/>나를 눌러줘</p>
          </div>
          <img className='rainbow-img' src='https://i.ibb.co/L8gSsGD/image-27.png' alt='마곰' title='마곰'/>
        </Link>
      </div>
    </div>
  );
};

export default Main1;
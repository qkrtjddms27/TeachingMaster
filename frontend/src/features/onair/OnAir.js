import { useEffect, useState } from 'react';
import { setToken, serverUrl } from '../../components/TOKEN';
import { Card } from 'react-bootstrap';
import './scss/OnAir.scss'
import { useHistory } from 'react-router-dom';


const OnAir = () => {
  let history = useHistory()
  const [onairClass, setOnairClass] = useState([])
  const [viewClass, setViewClass] = useState([])
  const [grade, setGrade] = useState('all')
  useEffect(() => {
    // 수업중인 교실 목록 요청보내기
    // conference테이블의 is_active가 true인 것의 user_profile, room_grade, room_num 필요함 (+@는 얘기해보기)
    const tmp = [
      {
        userProfile: 'https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg',
        roomeGrade: '1',
        roomNum: '1'
      },
      {
        userProfile: 'https://img.insight.co.kr/static/2020/09/02/700/98j4263429d06416wy82.jpg',
        roomeGrade: '1',
        roomNum: '2'
      },
      {
        userProfile: 'https://dispatch.cdnser.be/wp-content/uploads/2017/02/8f928ac94dabf0f77af2f7f53a240253.jpg',
        roomeGrade: '2',
        roomNum: '1'
      },
      {
        userProfile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ1RMcREa4c_NRx4g6525w4XFmP1v-iVyyVw&usqp=CAU',
        roomeGrade: '2',
        roomNum: '2'
      },
      {
        userProfile: 'https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg',
        roomeGrade: '3',
        roomNum: '1'
      },
      {
        userProfile: 'https://img.insight.co.kr/static/2020/09/02/700/98j4263429d06416wy82.jpg',
        roomeGrade: '3',
        roomNum: '2'
      },
      {
        userProfile: 'https://dispatch.cdnser.be/wp-content/uploads/2017/02/8f928ac94dabf0f77af2f7f53a240253.jpg',
        roomeGrade: '4',
        roomNum: '1'
      },
      {
        userProfile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ1RMcREa4c_NRx4g6525w4XFmP1v-iVyyVw&usqp=CAU',
        roomeGrade: '4',
        roomNum: '2'
      },
      {
        userProfile: 'https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg',
        roomeGrade: '5',
        roomNum: '1'
      },
      {
        userProfile: 'https://img.insight.co.kr/static/2020/09/02/700/98j4263429d06416wy82.jpg',
        roomeGrade: '5',
        roomNum: '2'
      },
      {
        userProfile: 'https://dispatch.cdnser.be/wp-content/uploads/2017/02/8f928ac94dabf0f77af2f7f53a240253.jpg',
        roomeGrade: '6',
        roomNum: '1'
      },
      {
        userProfile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ1RMcREa4c_NRx4g6525w4XFmP1v-iVyyVw&usqp=CAU',
        roomeGrade: '6',
        roomNum: '2'
      },
    ]
    setOnairClass(tmp)
  }, [])
  useEffect(() => {
    setViewClass(onairClass)
  }, [onairClass])
  useEffect(() => {
    if (grade === 'all') {
      setViewClass(onairClass)
    } else {
      setViewClass(onairClass.filter(v => v.roomeGrade === String(grade)))
    }
  }, [grade])
  const enterClass = (v) => {
    // 학년, 반을 url params에서 가져오게 하고
    const roomId = `ssafy${v.roomeGrade}0${v.roomNum}`
    // userName은 localStorage에서 가져오게 하는게 맞는듯?
    history.push(`/class/teacher/${roomId}`)
  }

  return (
    <div className='onair-page'>
      <div className='box'>
        <div className='onair-grade'>
          <p className='grade-p' onClick={() => setGrade('all')}><span className='grade-span'>전체</span></p>
          {[1, 2, 3, 4, 5, 6].map(v => (
            <p key={v} className='grade-p' onClick={() => setGrade(v)}><span className='grade-span'>{v}학년</span></p>
          ))}
        </div>
        <div className='onair-cards'>
          {viewClass.map((v, idx) => {
            return (
            <Card key={idx} className='onair-card' onClick={() => enterClass(v)}>
              <img className='image' alt='담임사진' src={v.userProfile} />
              <Card.Text>{v.roomeGrade}학년 {v.roomNum}반</Card.Text>
            </Card>
          )})}
        </div>
      </div>
    </div>
  );
};

export default OnAir;
import { useEffect, useState } from 'react';
import { setToken, serverUrl } from '../../components/TOKEN';
import { Card } from 'react-bootstrap';
import './scss/OnAir.scss'
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const OnAir = () => {
  let history = useHistory()
  const [onairClass, setOnairClass] = useState([])
  const [viewClass, setViewClass] = useState([])
  const [grade, setGrade] = useState('all')

  // 수업중인 교실 목록 요청보내기
  // conference테이블의 is_active가 true인 것의 user_profile, room_grade, room_num 필요함
  useEffect(() => {
    axios({
      url: `${serverUrl}/conference/check`,
      method: 'GET',
      headers: setToken(),
    })
    .then(({data}) => {
      setOnairClass(data)
    })
    .catch(err => console.log('isActive class:', err))
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
    const roomId = `ssafy${v.roomGrade}0${v.roomNum}`
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
          {viewClass.map((classroom, idx) => {
            return (
            <Card key={idx} className='onair-card' onClick={() => enterClass(classroom)}>
              <img className='image' alt='담임사진' src={classroom.userProfile} />
              <Card.Text>{classroom.roomGrade}학년 {classroom.roomNum}반</Card.Text>
            </Card>
          )})}
        </div>
      </div>
    </div>
  );
};

export default OnAir;
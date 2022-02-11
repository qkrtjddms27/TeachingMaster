import React,{useState,useEffect} from 'react'
import { Box,  Heading} from '@chakra-ui/react'
import './scss/Home.scss'
import QuizBar from './components/QuizBar'
import AOS from 'aos'
import "aos/dist/aos.css"
import axios from 'axios'
import { setToken, serverUrl } from '../../components/TOKEN'
import { useHistory } from 'react-router-dom'
// 유저정보에서 선생님 사진 받아오기
const Home = ({user,setUser,setHeader}) => {
  const history = useHistory()
  const [quiz,setQuiz] =useState([])
  useEffect(()=>{
    setHeader(true)
    AOS.init()
  },[])

  useEffect(()=>{
    const userId = localStorage.getItem("userId")
    axios({
      url:`${serverUrl}/v1/quiz/select/favor/${userId}`,
      method:"GET",
      headers:setToken(),
    })
    .then(res=>{
      setQuiz(res.data)
      setUser(JSON.parse(localStorage.getItem("user")))
    })
    .catch(err=>{
      console.log("홈 문제받기 에러")
      console.log(err)
    })
  },[])

  const [classTitle, setClassTitle] = useState("🎈 행복이 가득한")
  const [class_open, setClass_open] =useState(false)

  // 처음에 교실이 열렸는지 닫혔는지 확인
  useEffect(() => {
    const userId = localStorage.getItem("userId")
    axios({
      url: `${serverUrl}/conference/check`,
      method: 'GET',
      headers: setToken(),
    })
    .then(({data}) => {
      // data에 내 userId가 있으면 setClass_open(true)
      data.map(activeClass => {
        if (activeClass.userId === userId) {
          setClass_open(true)
        }
      })
    })
    .catch(err => console.log('isActive class:', err))
  }, [])

  // 강의실 열기 닫기
  const openOrClose = (changeActive) => {
    // console.log(changeActive, '로 바꿀건데 요청보낼 주소를 몰라요')
    axios({
      url: `${serverUrl}/conference`,
      method: 'PUT',
      headers: setToken(),
      data: {
        userId: localStorage.getItem("userId"),
        buttonValue: changeActive
      }
    })
    .then(() => {
      if (changeActive === 0) {
        setClass_open(true)
      } else {
        setClass_open(false)
      }
    })
    .catch(err => console.log('change classroom active:', err))
  }

  return (
    <div>
      <div className='class-box'>
        {/* 껍데기 */}
        <Box className='teacher-box' data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-easing="line">
            {/* 선생님 페이지 */}
            <Heading className='classTitle'>{classTitle}</Heading>
            <Heading className='grade-class'>{user.roomGrade}학년 {user.roomNum}반</Heading>
            <div className='teacherpage'>
              <div className='image-box'>
                <img className='image' alt='선생님사진'
                src={user.userProfile} />
              </div>
                <Heading className='name' >{user.userName} 선생님</Heading> 
                {class_open?
              <div className='when-open'>
                <Box className='class-enter' onClick={()=>{
                  const roomId = `ssafy${user.roomGrade}0${user.roomNum}`
                  history.push(`/class/teacher/${roomId}`)
                }} >교실 입장</Box>
                <Box className='class-close' onClick={() => openOrClose(1)} >교실 닫기</Box>
              </div>:
              <div className='when-close'>
                <Box className='class-open' onClick={() => openOrClose(0)}>교실 열기</Box>
              </div>}
            </div>
          </Box>
            <img className='TM-circle' alt="TM" src="https://cdn.discordapp.com/attachments/885744368399560725/941713229422395452/TM_circle.png"/>
        <div data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-easing="line">
              <QuizBar quiz={quiz} className='quizbar' userId={user.userId} user={user}/>      
        </div>
        
      </div>
      </div>
  )
}
export default Home

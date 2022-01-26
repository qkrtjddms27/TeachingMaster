import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Radio,RadioGroup,Stack,Textarea,Input,Button,Select } from '@chakra-ui/react';
import './scss/createquiz.scss'
import { useParams } from 'react-router-dom';
import { QUIZ, setToken } from '../../components/TOKEN';

const Updatequiz = () => {
  let {id} = useParams()
  let history = useHistory()
  const [quiz,setQuiz] = useState(QUIZ)
  const [userId,setUserId] = useState(localStorage.getItem("userId"))
  const [title,setTitle] =useState(quiz.quizTitle)
  const [subject,setSubject] = useState(quiz.subject)
  const [timeout,setTimeout] = useState(quiz.quizTimeout)
  const [grade,setGrade] = useState(quiz.quizGrade)
  const [open,setOpen] =useState(String(quiz.openStatus))
  const [contents,setContents] = useState(quiz.quizContents)
  const [answer,setAnswer] = useState(String(quiz.quizAnswer))
  const [choice1,setChoice1] = useState(quiz.options[0])
  const [choice2,setChoice2] = useState(quiz.options[1])
  const [choice3,setChoice3] = useState(quiz.options[2])
  const [choice4,setChoice4] = useState(quiz.options[3])

  useEffect (()=>{
    console.log(id)
    axios({
      url:`http://localhost:8080/api/v1/quiz/find/Quiz/${id}`,
      method:"GET",
      headers: setToken()
    })
    .then(res=>{
      setQuiz(res.data)
      setTitle(res.data.quizTitle)
      setSubject(res.data.subject)
      setTimeout(res.data.quizTimeout)
      setGrade(res.data.quizGrade)
      setOpen(String(res.data.openStatus))
      setContents(res.data.quizContents)
      setAnswer(String(res.data.quizAnswer))
      setChoice1(res.data.options[0])
      setChoice2(res.data.options[1])
      setChoice3(res.data.options[2])
      setChoice4(res.data.options[3])
    })
    .catch(err=>{
      console.log('UPDATE 문제 불러오기')
    })
  },[])
  
  const DELETE = ()=>{
    axios({
      url :`http://localhost:8080/api/v1/quiz/delete/${id}`,
      method:"DELETE",
      headers:setToken()
    }
    ).then(res=>{
      console.log(res)
      alert('삭제되었습니다.')
      setQuiz([])
      history.push('/')
    }).catch(err=>{
      console.log(err)
    })
  }

  const UPDATE = ()=>{
    const data ={
      // folderId는 없앨것
      "openStatus": Boolean(open),
      "options": [choice1,choice2,choice3,choice4],
      "quizAnswer": Number(answer),
      "quizContents": contents,
      "quizGrade": grade,
      "quizId": Number(id),
      "quizPhoto": "noPhoto",
      "quizTimeout": Number(timeout),
      "quizTitle": title,
      "subject":subject,
      "userId": userId
    }
    axios(
      {
        url : "http://localhost:8080/api/v1/quiz/update/quiz",
        method: "PUT",
        data,
        headers : setToken()
      }
    ).then(res=>{
      setQuiz(data)
      alert('수정완료')
      // history.push('/quiz/')
    }).catch(err=>{
      alert('문제 UPDATE 실패')
    })
  }
  return (
  <div>
    <div className='box'>
      <br/>
      <img className='quiz-img' alt="img" src='https://cdn-icons-png.flaticon.com/256/4681/4681580.png'/>  
      <div className='title-box'>
        <span className='title-text'>제목 :  </span> 
        <Input value={title}
        onChange={(e)=>setTitle(e.target.value)} 
        variant="lg" className='title-input'/>
      </div>
      <div className='sub_time_grade_open-box'>
        <div className='subject-box'>
          <Select value={subject} onChange={(e)=>setSubject(e.target.value)} className='subject-select'>
            <option value="korean">국어</option>
            <option value="english">영어</option>
            <option value="math">수학</option>
            <option value="society">사회</option>
            <option value="science">과학</option>
            <option value="etc">기타</option>
          </Select>
        </div>
        <div className='time-box'>
          <Select value={timeout} onChange={(e)=>setTimeout(e.target.value)} className='time-select'>
            <option value={15}>15초</option>
            <option value={30}>30초</option>
            <option value={60}>1분</option>
            <option value={120}>2분</option>
            <option value={180}>3분</option>
          </Select>
        </div>
        <div className='grade-box'>
          <Select value={grade} onChange={(e)=>setGrade(e.target.value)} className='grade-select'>
            <option value={1}>1학년</option>
            <option value={2}>2학년</option>
            <option value={3}>3학년</option>
            <option value={4}>4학년</option>
            <option value={5}>5학년</option>
            <option value={6}>6학년</option>
          </Select>
        </div>
      
        <div className='open-box'>
          <RadioGroup onChange={setOpen} value={open} >
            <Stack spacing={5} direction='row'>
              <Radio  colorScheme='green' value ="true">
                <p>공개</p>
              </Radio>
              <Radio  colorScheme='red' value= "false">
                <p>비공개</p>
              </Radio>
            </Stack>
          </RadioGroup>
        </div>
      </div>

      <div className='content-box'>
        <p className='content-text'>문제 :</p>
        <Textarea value={contents} onChange={(e)=>setContents(e.target.value)}
        variant="lg" className='content-input'/>
      </div>
      <div className='choice-box'>
      <p className='choice-text'>보기 :</p>
        <RadioGroup onChange={setAnswer} value={answer} >
            <div className='choice'>
              <Radio size='lg' colorScheme='orange' value ="1"/>
              <Input id={answer=== "1" ? "answer":""} value={choice1} onChange={(e)=>setChoice1(e.target.value)} />
            </div>
            <div className='choice'>
              <Radio size='lg' colorScheme='orange' value ="2"/>
              <Input id={answer=== "2" ? "answer":""} value={choice2} onChange={(e)=>setChoice2(e.target.value)} />
            </div>
            <div className='choice'>
              <Radio size='lg' colorScheme='orange' value ="3"/>
              <Input id={answer=== "3" ? "answer":""} value={choice3} onChange={(e)=>setChoice3(e.target.value)} />
            </div>
            <div className='choice'>
              <Radio size='lg' colorScheme='orange' value ="4"/>
              <Input id={answer=== "4" ? "answer":""} value={choice4} onChange={(e)=>setChoice4(e.target.value)}/>
            </div>
          </RadioGroup>
      </div>
      <Stack className='step2-stack2'>
        <div className='quiz-create-button'>
          <Button borderRadius={0} variant="solid" className='prev-button' 
            bgColor="#B5A18C" colorScheme="#c7baac" width="48%" 
          >이전</Button>
          <Button borderRadius={0} variant="solid" className="submit-button" 
            bgColor="#7e5526" colorScheme="#472b0a" width="48%" onClick={() => UPDATE()}
          >수정하기</Button>
          <Button borderRadius={0} variant="solid" className='prev-button' 
            bgColor="#B5A18C" colorScheme="#c7baac" width="48%" onClick={()=> DELETE()}
          >삭제</Button>
        </div>
      </Stack>
    </div>
  </div>
  );
};

export default Updatequiz;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Radio,RadioGroup,Stack,Textarea,Input,Button,Select } from '@chakra-ui/react';
import './scss/createquiz.scss'
import { setToken, serverUrl } from '../../components/TOKEN';
const Createquiz = () => {
  
  let history = useHistory()
  const [userId,setUserId] = useState(localStorage.getItem("userId"))
  const [title,setTitle] =useState("")
  const [subject,setSubject] = useState("국어")
  const [timeout,setTimeout] = useState(15)
  const [grade,setGrade] = useState(1)
  const [open,setOpen] =useState("true")
  const [contents,setContents] = useState("")
  const [answer,setAnswer] = useState(1)
  const [choice1,setChoice1] = useState("")
  const [choice2,setChoice2] = useState("")
  const [choice3,setChoice3] = useState("")
  const [choice4,setChoice4] = useState("")
  const onSubmit = ()=>{
    const data ={
      "openStatus": Boolean(open),
      "options": [choice1,choice2,choice3,choice4],
      "quizAnswer": Number(answer),
      "quizContents": contents,
      "quizGrade": Number(grade),
      "quizId": 0,
      "quizPhoto": "noPhoto",
      "quizTimeout": Number(timeout),
      "quizTitle": title,
      "subject":subject,
      "userId": userId
    }
    axios(
      { 
        // url : "i6e107.p.ssafy.io:8080/api/v1/quiz/create"
        url : `${serverUrl}/v1/quiz/create`,
        method: "POST",
        data,
        headers : setToken()
      }
    ).then(res=>
      history.push("/quiz/folder/imade")
    ).catch(err=>{
      console.log(data)
      alert('실패')
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
          {/* <p className='subject-text'>과목: </p> */}
          <Select value={subject} onChange={(e)=>setSubject(e.target.value)} className='subject-select'>
            <option value="국어">국어</option>
            <option value="영어">영어</option>
            <option value="수학">수학</option>
            <option value="사회">사회</option>
            <option value="과학">과학</option>
            <option value="기타">기타</option>
          </Select>
        </div>
        <div className='time-box'>
          {/* <p className='time-text'>제한시간: </p> */}
          <Select value={timeout} onChange={(e)=>setTimeout(e.target.value)} className='time-select'>
            <option value={15}>15초</option>
            <option value={30}>30초</option>
            <option value={60}>1분</option>
            <option value={120}>2분</option>
            <option value={180}>3분</option>
          </Select>
        </div>
        <div className='grade-box'>
          {/* <p className='grade-text'>학년: </p> */}
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
              <Radio  colorScheme='green' value = "true">
                <p>공개</p>
              </Radio>
              <Radio  colorScheme='red' value="false">
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
            <Input id={answer==="1"?"answer":""} value={choice1} onChange={(e)=>setChoice1(e.target.value)} />
          </div>
          <div className='choice'>
            <Radio size='lg' colorScheme='orange' value ="2"/>
            <Input id={answer==="2"?"answer":""} value={choice2} onChange={(e)=>setChoice2(e.target.value)} />
          </div>
          <div className='choice'>
            <Radio size='lg' colorScheme='orange' value ="3"/>
            <Input id={answer==="3"?"answer":""} value={choice3} onChange={(e)=>setChoice3(e.target.value)} />
          </div>
          <div className='choice'>
            <Radio size='lg' colorScheme='orange' value ="4"/>
            <Input id={answer==="4"?"answer":""} value={choice4} onChange={(e)=>setChoice4(e.target.value)}/>
          </div>
        </RadioGroup>
        <div></div>
      </div>
      <Stack className='step2-stack2'>
        <div className='quiz-create-button'>
          <Button borderRadius={0} variant="solid" className='prev-button' 
            bgColor="#B5A18C" colorScheme="#c7baac" width="48%" 
          >이전</Button>
          <Button borderRadius={0} variant="solid" className="submit-button" 
            bgColor="#7e5526" colorScheme="#472b0a" width="48%" onClick={() => onSubmit()}
          >제출</Button>
        </div>
      </Stack>
    </div>
  </div>
  );
};

export default Createquiz;

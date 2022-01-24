import React, { useState } from 'react';
import { Radio,RadioGroup,Stack,Textarea,Input,Button,Select } from '@chakra-ui/react';
import './createquiz.scss'
const Createquiz = () => {
  const [title,setTitle] =useState("제목")
  const [subject,setSubject] = useState("math")
  const [time,setTime] = useState(60)
  const [grade,setGrade] = useState(3)
  const [open,setOpen] =useState("true")
  const [content,setContent] = useState("내용물")
  const [answer,setAnswer] = useState(1)
  const [choice,setChoice] = useState(
    {"1":12,"2":11,"3":22,"4":33}
  )
  const Submit = ()=>{
    const choices = Object.values(choice)
    console.log(choices)
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
            <option value="korean">국어</option>
            <option value="english">영어</option>
            <option value="math">수학</option>
            <option value="society">사회</option>
            <option value="science">과학</option>
            <option value="etc">기타</option>
          </Select>
        </div>
        <div className='time-box'>
          {/* <p className='time-text'>제한시간: </p> */}
          <Select value={time} onChange={(e)=>setTime(e.target.value)} className='time-select'>
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
        <Textarea value={content} onChange={(e)=>setContent(e.target.value)}
        variant="lg" className='content-input'/>
      </div>
      <div className='choice-box'>
      <p className='choice-text'>보기 :</p>
        <RadioGroup onChange={setAnswer} value={answer} >
          <div className='choice'>
            <Radio size='lg' colorScheme='orange' value ="1"/>
            <Input id={answer==="1"?"answer":""} value={choice[1]} onChange={(e)=>setChoice({...choice,1:e.target.value})} />
          </div>
          <div className='choice'>
            <Radio size='lg' colorScheme='orange' value ="2"/>
            <Input id={answer==="2"?"answer":""} value={choice[2]} onChange={(e)=>setChoice({...choice,2:e.target.value})} />
          </div>
          <div className='choice'>
            <Radio size='lg' colorScheme='orange' value ="3"/>
            <Input id={answer==="3"?"answer":""} value={choice[3]} onChange={(e)=>setChoice({...choice,3:e.target.value})} />
          </div>
          <div className='choice'>
            <Radio size='lg' colorScheme='orange' value ="4"/>
            <Input id={answer==="4"?"answer":""} value={choice[4]} onChange={(e)=>setChoice({...choice,4:e.target.value})}/>
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
            bgColor="#7e5526" colorScheme="#472b0a" width="48%" onClick={() => Submit()}
          >제출</Button>
        </div>
      </Stack>
    </div>
  </div>
  );
};

export default Createquiz;

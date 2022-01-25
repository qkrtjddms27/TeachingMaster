import {Image, Select, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, 
        Box, Text, Button, Popover, PopoverTrigger, PopoverContent, 
        PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import onetwo from './plusicon.gif'
import qicon from './qicon.png'
// import EachQuiz from './EachQuiz'
import { folders, quizzes } from './quizzes'
import { qz, myfd } from './qzz.js'
import './InFolder.scss'

const InFolder = () => {
  let {id} = useParams()
  const [folder,setfolder] = useState({})
  const [quizlist,setQuizlist]  = useState([])


  const [qzList, setQzList] = useState([])
  const [sub, setSub] = useState('전체')
  const [grade, setGrade] = useState('all')
  useEffect(() => {
    if (grade === 'all') {
      if (sub === '전체') {
        setQzList(qz)
      } else {
        setQzList(qz.filter(quiz => quiz.subject === sub))
      }
    } else {
      if (sub === '전체') {
        setQzList(qz.filter(quiz => quiz.grade === Number(grade)))
      } else {
        setQzList(qz.filter(quiz => quiz.grade === Number(grade) && quiz.subject === sub))
      }
    }
  }, [sub, grade])


  // useEffect(()=>{
  //   setfolder(folders.filter(folder=>folder.id===Number(id))[0])
  //   setQuizlist(quizzes.filter(quiz =>quiz.folder_id===Number(id)))
  // },[id])


  return (
    <div className='in-fd'>
      <div className='in-fd-nav'>
        <div className='in-fd-menu'>
          <Link className='in-fd-a' to="/quiz/folder/all"><span className='in-fd-sp'>전체보기</span></Link>
        </div>
        <div className='in-fd-menu'>
          <Link className='in-fd-a' to="/quiz/folder/bookmark"><span className='in-fd-sp'>즐겨찾기</span></Link>
        </div>
        <div className='in-fd-menu'>
          <Link className='in-fd-a' to="/quiz/folder/imade"><span className='in-fd-sp'>내가 만든 문제</span></Link>
        </div>
        <Menu className='in-fd-menu'>
          {/* 누르면 팝업이든 뭐든 띄워서 누르게하기 -> select하니까 모양이 망가짐 */}
          <MenuButton className='in-fd-menu'><span className='in-fd-sp'>내 폴더</span></MenuButton>
          <MenuList>
            {myfd.map(fd => {
              // 이름으로 할까 id로 할까? 한글로 보내면 깨지지 않을까?
              const url = `/quiz/folder/${fd.folder_id}`
              // const url = `/quiz/folder/${fd.folder_name}`
              return (
                <MenuItem key={fd.folder_id}><Link to={url}>{fd.folder_name}</Link></MenuItem>
              )
            })}
          </MenuList>
        </Menu>
      </div>

      <div>
        <Image className='in-fd-img' src={onetwo} boxSize='30%' alt='띵동' />
      </div>

      <div className='in-fd-sub'>
        <p className='in-fd-each-sub' onClick={() => setSub('전체')}><span className='line'>전체</span></p>
        <p className='in-fd-each-sub' onClick={() => setSub('국어')}><span className='line'>국어</span></p>
        <p className='in-fd-each-sub' onClick={() => setSub('영어')}><span className='line'>영어</span></p>
        <p className='in-fd-each-sub' onClick={() => setSub('수학')}><span className='line'>수학</span></p>
        <p className='in-fd-each-sub' onClick={() => setSub('사회')}><span className='line'>사회</span></p>
        <p className='in-fd-each-sub' onClick={() => setSub('과학')}><span className='line'>과학</span></p>
        <p className='in-fd-each-sub' onClick={() => setSub('기타')}><span className='line'>기타</span></p>
      </div>

      <div className='in-fd-grade'>
        <Select onChange={(e) => setGrade(e.target.value)}>
          <option value='all'>전체</option>
          <option value='1'>1학년</option>
          <option value='2'>2학년</option>
          <option value='3'>3학년</option>
          <option value='4'>4학년</option>
          <option value='5'>5학년</option>
          <option value='6'>6학년</option>
        </Select>
      </div>

      <div>
        <Accordion allowToggle>
          {qzList.map(
            (quiz) => {
            const url = `/quiz/${quiz.id}/update`
            return (
              <AccordionItem key={quiz.id}>
                <h2>
                  <AccordionButton>
                    <Box className='in-fd-quiz' flex='1'>
                      <Image src={qicon} boxSize='4%' alt='Q?' />
                      <Text>{quiz.subject}</Text>
                      <Text>{quiz.title}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className='in-fd-quiz-open'>
                  <div className='in-fd-quiz'>
                    <Image src={qicon} boxSize='4%' alt='A!' />
                    <Text>내용</Text>
                    <Text className='in-fd-quiz-last'>{quiz.content}</Text>
                  </div>
                  <div className='in-fd-quiz'>
                    <Box boxSize='4%'></Box>
                    <Text>보기</Text>
                    <div className='in-fd-quiz-last'>
                      {quiz.choices.map((choice, index) => (
                        <div key={index} className={(index+1) === quiz.answer ? 'in-fd-correct' : ''}>{index+1}) {choice}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Popover placement='top-start'>
                      <PopoverTrigger>
                        <Button>폴더</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverHeader fontWeight='semibold'>담을 폴더를 선택하세요</PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <li>어려워</li>
                          <li>쉬워</li>
                          <li>국</li>
                          <li>영</li>
                          <li>수</li>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                    <Link to={url}><Button>수정</Button></Link>
                  </div>
                </AccordionPanel>
              </AccordionItem>      
            )})
          }
        </Accordion>
      </div>


      {/* {quizlist.map(quiz=>{ 
        return(<EachQuiz key={quiz.id} quiz={quiz}/>)
      })} */}
    </div>
  )
}

export default InFolder

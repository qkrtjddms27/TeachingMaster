import {Image, Select, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, 
  Box, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { setToken } from '../../components/TOKEN'
import onetwo from './image/plusicon.gif'
import qicon from './image/qicon.png'
import aicon from './image/question.png'
import './scss/InFolder.scss'
import inmyfolder from './image/inmyfolder.png'
import edit from './image/edit.png'
import star3 from './image/star3.png'
import fileadd from './image/fileadd.png'


const InFolder = () => {
  let { thisFolder } = useParams()
  // const [thisFolder, setThisFolder] = useState(useParams(thisFolder))
  const {userId} = JSON.parse(localStorage.getItem("user"))

  // 선택해서 보여줄 과목과 학년
  const [sub, setSub] = useState('전체')
  const [grade, setGrade] = useState('all')

  // 페이지가 처음 랜더링되면 퀴즈목록 요청을 보냄 -> 전체 퀴즈들은 지니고 있어야함
  const [qz, setQz] = useState([])
  useEffect(() => {
    let url
    if (thisFolder === 'all' || thisFolder === 'imade') {
      url = `http://localhost:8080/api/v1/quiz/findAll/${userId}`               // 전체 문제 or 내가만든 문제
    } else if (thisFolder === 'bookmark') {
      url = `http://localhost:8080/api/v1/quiz/select/favor/${userId}`          // 즐겨찾기한 문제
    } else {
      url = `http://localhost:8080/api/v1/quiz/find/folderQuiz/${thisFolder}`   // 내 폴더안에 있는 문제
    }
    axios({
      url,
      method: "GET",
      headers: setToken()
    })
    .then(({data}) => {
      if (thisFolder === 'imade') {
        setQz(data.filter(quiz => quiz.userId === userId))
      } else {
        setQz(data.filter(quiz => quiz.openStatus || quiz.userId === userId))
      }
    // console.log('axios url:', url)
      console.log('res.data:', data)
    })
    .catch(err => {
      console.log(thisFolder + '에 요청보냈는데 오류났다')
      console.log(err)
    })
  }, [])

  // 퀴즈목록 담기면 폴더목록 요청 보냄
  const [myfd, setMyfd] = useState([])
  useEffect(() => {
    axios({
      url: `http://localhost:8080/api/v1/quiz/folder/${userId}`,
      method: "GET",
      headers: setToken()
    })
    .then(({data}) => {
      setMyfd(data)
    })
    .catch(err => {
      console.log('내가 가진 폴더 리스트 받아와야하는데 오류났다')
      console.log(err)
    })
  }, [qz])

  // 보여줄 퀴즈 리스트 (처음에 공개되거나 내가만든 것만)
  const [qzList, setQzList] = useState([])
  useEffect(() => {
  setQzList(qz)
  // setQzList(qz.filter(quiz => quiz.openStatus || quiz.userId === userId))
  }, [myfd])

  // 학년이나 과목이 바뀌면 바꿔 보여줘야 함
  useEffect(() => {
  if (grade === 'all') {
    if (sub === '전체') {
      setQzList(qz)
    } else {
      setQzList(qz.filter(quiz => quiz.subject === sub))
    }
  } else {
    if (sub === '전체') {
      setQzList(qz.filter(quiz => quiz.quizGrade === Number(grade)))
    } else {
      setQzList(qz.filter(quiz => quiz.quizGrade === Number(grade)))
    }
  }
  }, [sub, grade])


  const quizAddFolder = (folderId, quizId) => {
    console.log("폴더아이디:", folderId, "퀴즈아이디:", quizId, "요청은 나중에 보낼게여...확인이 힘드네여...")
    // axios({
    //   url: 'http://localhost:8080/api/v1/quiz/update/folder_mapping',
    //   method: 'POST',
    //   headers: setToken(),
    //   data: { folderId, quizId }
    // })
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(err => {
    //   console.log('폴더이 퀴즈 담다가 오류났다')
    //   console.log(err)
    // })
  }


  return (
    <div className='in-fd'>
    <div className='in-fd-fileadd'></div>

    <div>
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
          <MenuButton className='in-fd-menu'><span className='in-fd-sp'>내 폴더</span></MenuButton>
          <MenuList>
            {myfd.map(({folderId, folderName}, idx) => {
              const url = `${folderId}`
              return (
                <MenuItem key={idx}><Link to={url}>{folderName}</Link></MenuItem>
              )
            })}
          </MenuList>
        </Menu>
      </div>



      <div className='in-fd-scroll'>

        <div>
          <Image className='in-fd-img' src={onetwo} boxSize='30%' alt='띵동' />
        </div>

        <div className='in-fd-sub'>
          <p className='in-fd-each-sub' onClick={() => setSub('전체')}><span className='line'>전체</span></p>
          <p className='in-fd-each-sub' onClick={() => setSub('Korean')}><span className='line'>국어</span></p>
          <p className='in-fd-each-sub' onClick={() => setSub('English')}><span className='line'>영어</span></p>
          <p className='in-fd-each-sub' onClick={() => setSub('Math')}><span className='line'>수학</span></p>
          <p className='in-fd-each-sub' onClick={() => setSub('Society')}><span className='line'>사회</span></p>
          <p className='in-fd-each-sub' onClick={() => setSub('Science')}><span className='line'>과학</span></p>
          <p className='in-fd-each-sub' onClick={() => setSub('기타')}><span className='line'>기타</span></p>
        </div>

        <div className='in-fd-grade'>
          <Select onChange={(e) => setGrade(e.target.value)}>
            <option value='all'>전체</option>
            <option value={1}>1학년</option>
            <option value={2}>2학년</option>
            <option value={3}>3학년</option>
            <option value={4}>4학년</option>
            <option value={5}>5학년</option>
            <option value={6}>6학년</option>
          </Select>
        </div>

        <div className='accordion'>
          <Accordion allowToggle>
            {qzList.map(
              ({quizId, subject, quizAnswer, quizContents, quizTitle, options}, idx) => {
              const qzUpdateUrl = `/quiz/${quizId}/update`
              return (
                <AccordionItem key={idx}>
                  <h2>
                    <AccordionButton>
                      <Box className='in-fd-quiz' flex='1'>
                        <Image src={qicon} boxSize='4%' alt='Q?' />
                        <Text>{subject}</Text>
                        <Text>{quizTitle}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} className='in-fd-quiz-open'>
                    <div className='in-fd-quiz in-fd-acco-content'>
                      <Image src={aicon} boxSize='4%' alt='A!' />
                      <Text>내용</Text>
                      <Text className='in-fd-quiz-last'>{quizContents}</Text>
                    </div>
                    <div style={{"height":"0.5rem"}}></div>
                    <div className='in-fd-quiz'>
                      <Box boxSize='4%'></Box>
                      <Text>보기</Text>
                      <div className='in-fd-quiz-last'>
                        {options.map((op, idx) => (
                          <div key={idx} className={(idx+1) === quizAnswer ? 'in-fd-correct' : ''}>{idx+1}) {op}</div>
                        ))}
                      </div>
                    </div>
                    <div className='in-fd-btns'>
                      <Menu>
                        <MenuButton title="폴더에 추가!"><Image src={inmyfolder} boxSize="25px" /></MenuButton>
                        <MenuList>
                          {myfd.map((fd, idx) => (
                            <MenuItem key={idx}>
                              <span onClick={() => quizAddFolder(fd.folderId, quizId)}>
                                {fd.folderName}
                              </span>
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                      <Link title="퀴즈 수정!" to={qzUpdateUrl}><Image className='in-fd-btn2' src={edit} boxSize="25px" /></Link>
                      <Image title="즐겨찾기!" src={star3} boxSize="25px" />
                    </div>
                  </AccordionPanel>
                </AccordionItem>      
              )})
            }
          </Accordion>
        </div>
      </div>

    </div>



    <div className='in-fd-fileadd' title='퀴즈 생성!'>
      <div></div>
      <Link to="/quiz/create"><Image src={fileadd} className='in-fd-add-quiz' /></Link>
    </div>



  </div>
  )
}

export default InFolder
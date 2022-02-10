import {Image, Select, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, 
  Box, Text, Menu, MenuButton, MenuList, MenuItem, useToast, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { setToken, serverUrl } from '../../components/TOKEN'
import './scss/InFolder.scss'


const InFolder = () => {
  let history = useHistory()
  let now = useParams().thisFolder
  const [thisFolder, setThisFolder] = useState(now)

  const {userId} = JSON.parse(localStorage.getItem("user"))
  const [qz, setQz] = useState([])                  // url 바뀔 때 받아오는 퀴즈들(안변함)
  const [myfd, setMyfd] = useState([])              // url 바뀔 때 받아오는 내 폴더 목록
  const [qzList, setQzList] = useState([])          // 보여줄 퀴즈 리스트(변함)
  const [sub, setSub] = useState('전체')
  const [grade, setGrade] = useState('all')

  // url 바뀌면 실행
  useEffect(() => {
    let url
    if (thisFolder === 'all' || thisFolder === 'imade') {
      url = `${serverUrl}/v1/quiz/findAll/${userId}`               // 전체 문제 or 내가만든 문제
    } else if (thisFolder === 'bookmark') {
      url = `${serverUrl}/v1/quiz/select/favor/${userId}`          // 즐겨찾기한 문제
    } else {
      url = `${serverUrl}/v1/quiz/find/folderQuiz/${thisFolder}`   // 내 폴더안에 있는 문제
    }
    // url에 맞는 퀴즈 받아오기
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
      // console.log('res.data:', data)
    })
    .catch(err => {
      console.log('axios quiz get err', err)
    })
  }, [thisFolder])

  // 처음 한번만 실행
  useEffect(() => {
    axios({
      url: `${serverUrl}/v1/quiz/folder/${userId}`,
      method: "GET",
      headers: setToken()
    })
    .then(({data}) => {
      setMyfd(data)
    })
    .catch(err => {
      console.log('InFolder: get my folder list err', err)
    })
  }, [])

  // myfd 저장하면 처음 qzList 초기화
  useEffect(() => {
    setQzList(qz)
    // console.log(qz)
  // setQzList(qz.filter(quiz => quiz.openStatus || quiz.userId === userId))
  }, [qz])

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

  const toast = useToast()
  // 퀴즈 폴더에 담기
  const quizAddFolder = (folderId, quizId) => {
    // console.log("폴더아이디:", folderId, "퀴즈아이디:", quizId, "요청은 나중에 보낼게여...확인이 힘드네여...")
    axios({
      url: `${serverUrl}/v1/quiz/update/folder_mapping`,
      method: 'POST',
      headers: setToken(),
      data: { folderId, quizId }
    })
    .then(({data}) => {
      const newList = []
      qzList.map(quiz => {
        if (quiz.quizId !== data.quizId) {
          newList.push(quiz)
        } else {
          quiz.folderCheck = !quiz.folderCheck
          newList.push(quiz)
        }
      })
      setQzList(newList)
    })
    .then(() => toast({
      description: '퀴즈를 폴더에 담았습니다',
      status: 'success'
    }))
    .catch(err => {
      console.log('InFolder: quiz folder err', err)
    })
  }


  // 내 개인 폴더에서 퀴즈 지우기
  const quizDelFolder = (quizId) => {
    axios({
      url: `${serverUrl}/v1/quiz/delete/folder_quiz/${thisFolder}/${quizId}`,
      method: 'DELETE',
      headers: setToken(),
    })
    .then(() => {
      console.log(qzList)
      setQzList(qzList.filter(quiz => quiz.quizId !== quizId))
    })
    .catch(err => {
      console.log('InFolder: quizDelFolder', err)
    })
  }

  // 폴더 삭제
  const delFolder = (folderId) => {
    axios({
      url: `${serverUrl}/v1/quiz/delete/folder/${folderId}`,
      method: 'DELETE',
      headers: setToken(),
    })
    .then(() => {
      history.push('/quiz/folder')
    })
    .catch(err => {
      console.log('InFolder: delFolder', err)
    })
  }

  // 내가 만든 퀴즈 삭제
  const delQuiz = (quizId) => {
    axios({
      url: `${serverUrl}/v1/quiz/delete/${quizId}`,
      method: 'DELETE',
      headers: setToken(),
    })
    .then(res => {
      // console.log(res)
      setQzList(qzList.filter(quiz => quiz.quizId !== quizId))
    })
    .catch(err => {
      console.log('InFolder: delQuiz', err)
    })
  }


  const changeStar = (q) => {                   // 즐겨찾기 요청
    // console.log("별 바꿀 퀴즈 정보:", q)
    setQzList( 
      qzList.map(quiz=>quiz.quizId === q.quizId ?
        {...quiz, bookMarkCheck: !quiz.bookMarkCheck} : quiz)
    )
    if (!q.bookMarkCheck) {
      // 즐겨찾기에 추가
      const data = { quizId: q.quizId, userId }
      data.bookMarkCheck = !q.bookMarkCheck
      axios({
        url: `${serverUrl}/v1/quiz/create/favor`,
        method: "POST",
        headers: setToken(),
        data,
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log('InFolder: changeStar(post)', err)
      })
    } else {
      // 즐겨찾기에서 제거
      axios({
        url: `${serverUrl}/v1/quiz/delete/bookmark/${userId}/${q.quizId}`,
        method: 'DELETE',
        headers: setToken(),
      })
      .then(() => {
        setQzList(qzList.filter(quiz => quiz.quizId !== q.quizId))
      })
      .catch(err => {
        console.log('InFolder: changeStar(delete)', err)
      })
    }
  }


  return (
    <div className='in-fd'>
    <div className='in-fd-fileadd'></div>

    <div>
      <div className='in-fd-nav'>
        <div className='in-fd-menu' id={thisFolder === 'all' ? 'in-fd-here' : ''}>
          <Link to="/quiz/folder/all"><span className='in-fd-sp' onClick={() => setThisFolder('all')}>전체보기</span></Link>
        </div>
        <div className='in-fd-menu' id={thisFolder === 'bookmark' ? 'in-fd-here' : ''}>
          <Link to="/quiz/folder/bookmark"><span className='in-fd-sp' onClick={() => setThisFolder('bookmark')}>즐겨찾기</span></Link>
        </div>
        <div className='in-fd-menu' id={thisFolder === 'imade' ? 'in-fd-here' : ''}>
          <Link to="/quiz/folder/imade"><span className='in-fd-sp' onClick={() => setThisFolder('imade')}>내가 만든 문제</span></Link>
        </div>
        <Menu className='in-fd-menu'>
          <MenuButton className='in-fd-menu'><span id={!isNaN(thisFolder) ? 'in-fd-here' : ''} className='in-fd-sp'>내 폴더</span></MenuButton>
          <MenuList>
            {myfd.map(({folderId, folderName}, idx) => {
              const myFolderUrl = `/quiz/folder/${folderId}`
              return (
                <MenuItem key={idx} className='infd-myfd-list'>
                  <Link to={myFolderUrl}><span onClick={() => setThisFolder(folderId)}>{folderName}</span></Link>
                  <Image onClick={() => delFolder(folderId)} src='https://i.ibb.co/1sbCZjR/cross-circle.png' boxSize='15px' alt='폴더 삭제' title='폴더삭제'/>
                </MenuItem>
              )
            })}
          </MenuList>
        </Menu>
      </div>



      <div className='in-fd-scroll'>

        <div>
          <Image className='in-fd-img' src='https://i.ibb.co/YQHgst6/plusicon.gif' boxSize='30%' alt='띵동' />
        </div>

        <div className='in-fd-sub'>
          <p className='in-fd-each-sub' onClick={() => setSub('전체')}><span className={sub === '전체' ? 'in-fd-line' : ''}>전체</span></p>
          <p className='in-fd-each-sub' onClick={() => setSub('Korean')}><span className={sub === 'Korean' ? 'in-fd-line' : ''}>국어</span></p>
          <p className='in-fd-each-sub' onClick={() => setSub('English')}><span className={sub === 'English' ? 'in-fd-line' : ''}>영어</span></p>
          <p className='in-fd-each-sub' onClick={() => setSub('Math')}><span className={sub === 'Math' ? 'in-fd-line' : ''}>수학</span></p>
          <p className='in-fd-each-sub' onClick={() => setSub('Society')}><span className={sub === 'Society' ? 'in-fd-line' : ''}>사회</span></p>
          <p className='in-fd-each-sub' onClick={() => setSub('Science')}><span className={sub === 'Science' ? 'in-fd-line' : ''}>과학</span></p>
          <p className='in-fd-each-sub' onClick={() => setSub('기타')}><span className={sub === '기타' ? 'in-fd-line' : ''}>기타</span></p>
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
              (q, idx) => {
              const qzUpdateUrl = `/quiz/${q.quizId}/update`
              return (
                <AccordionItem key={idx}>
                  <h2>
                    <AccordionButton>
                      <Box className='in-fd-quiz' flex='1'>
                        <Image src='https://i.ibb.co/LpSCBYt/qicon.png' boxSize='4%' alt='Q?' />
                        <Text className='in-fd-name'>{q.subject}</Text>
                        <Text>{q.quizTitle}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} className='in-fd-quiz-open'>
                    <div className='in-fd-quiz in-fd-acco-content'>
                      <Image src='https://i.ibb.co/Wy3q8HN/question.png' boxSize='4%' alt='A!' />
                      <Text className='in-fd-name'>내용</Text>
                      <Text className='in-fd-quiz-last'>{q.quizContents}</Text>
                    </div>
                    <div style={{"height":"0.5rem"}}></div>
                    <div className='in-fd-quiz'>
                      <Box boxSize='4%'></Box>
                      <Text className='in-fd-name'>보기</Text>
                      <div className='in-fd-quiz-last'>
                        {q.options.map((op, idx) => (
                          <div key={idx} className={(idx+1) === q.quizAnswer ? 'in-fd-correct' : ''}>{idx+1}) {op}</div>
                        ))}
                      </div>
                    </div><br/>
                    <div className='in-fd-quiz'>
                      <Box boxSize='4%'></Box>
                      <Text className='in-fd-name'>제한시간</Text>
                      <Text>{q.quizTimeout}초</Text>
                    </div>
                    <div className='in-fd-btns'>
                      {thisFolder === 'imade' && (
                        <Image onClick={() => delQuiz(q.quizId)} boxSize='25px' src='https://cdn-icons-png.flaticon.com/512/3096/3096673.png' alt='퀴즈 삭제' title='퀴즈 삭제' />
                      )}
                      {!q.folderCheck && (
                        <Menu>
                          <MenuButton title="폴더에 추가!"><Image src='https://i.ibb.co/5sdgMB7/inmyfolder.png' boxSize="25px" /></MenuButton>
                          <MenuList>
                            {myfd.map((fd, idx) => (
                              <MenuItem key={idx}>
                                <span onClick={() => quizAddFolder(fd.folderId, q.quizId)}>
                                  {fd.folderName}
                                </span>
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                      )}
                      {thisFolder !== 'all' && thisFolder !== 'imade' && thisFolder !== 'bookmark' && (
                        <Image onClick={() => quizDelFolder(q.quizId)} src='https://i.ibb.co/1sbCZjR/cross-circle.png' boxSize='25px' alt='폴더에서 삭제' title='폴더에서 퀴즈 빼기!'/>
                      )}
                      {q.userId === userId && (
                        <Link title="퀴즈 수정!" to={qzUpdateUrl}><Image className='in-fd-btn2' src='https://i.ibb.co/GCQKnYH/edit.png' boxSize="25px" /></Link>
                      )}
                      {q.bookMarkCheck ? (
                        <Image title="즐겨찾기 제외!" src='https://i.ibb.co/8KprR2y/star4.png' onClick={() => changeStar(q)} boxSize="25px" />
                        ) : (
                        <Image title="즐겨찾기 추가!!" src='https://i.ibb.co/QPDyvqQ/star3.png' onClick={() => changeStar(q)} boxSize="25px" />
                      )}
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
      <Link to="/quiz/create"><Image src='https://i.ibb.co/p0j4x07/folderadd.png' className='in-fd-add-quiz' /></Link>
    </div>



  </div>
  )
}

export default InFolder
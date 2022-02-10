import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Image, ModalBody, ModalCloseButton, ModalContent, ModalHeader, Text, Button, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { serverUrl, setToken } from '../../../components/TOKEN';
import '../scss/TeacherModal.scss'

const BookmarkQuiz = ({quizQ, onClose}) => {
  const [bookmark, setBookmark] = useState([])
  const { userId } = JSON.parse(localStorage.getItem("user"))
  
  useEffect(() => {
    axios({
      url: `${serverUrl}/v1/quiz/select/favor/${userId}`,
      method: 'GET',
      headers: setToken()
    })
    .then(({data}) => {
      setBookmark(data.filter(quiz => quiz.openStatus || quiz.userId === userId))
    })
    .catch(err => {
      console.log('Fail: axios bookmark quiz list')
      console.log(err)
    })
  }, [])

  const submitBookmark = (q) => {
    console.log('set Bookmark Quiz:', q)
    sessionStorage.setItem("bookmarkQuiz", JSON.stringify(q))
    onClose()
    quizQ()
    
  }

  return (
    <ModalContent w='70rem' h='20rem' marginY='5rem' marginX='1rem' >
      <ModalHeader className='teacher-modal-header'>
        <div style={{"fontSize": "xx-large"}}>퀴즈선택</div>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody className='bookmark-body'>

        <Accordion allowToggle>
          {bookmark.map(
            (q, idx) => {
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
                  <div className='bookmark-bottom'>
                    {/* <Box boxSize='4%'></Box> */}
                    <Button w='5%' colorScheme='telegram' variant='outline' onClick={() => {submitBookmark(q)}}>출제</Button>
                    <Text className='in-fd-name'>제한시간</Text>
                    <Text>{q.quizTimeout}초</Text>
                  </div>
                </AccordionPanel>
              </AccordionItem>      
            )})
          }
        </Accordion>
      </ModalBody>
    </ModalContent>
  );
};

export default BookmarkQuiz;
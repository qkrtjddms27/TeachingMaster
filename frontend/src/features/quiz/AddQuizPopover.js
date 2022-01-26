import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, 
  PopoverCloseButton, PopoverBody, Button, Image, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import add from './image/add.png'
import axios from 'axios'
import { setToken } from '../../components/TOKEN';
import AOS from 'aos'
import "aos/dist/aos.css"


const AddQuizPopover = ({myFolders, setMyFolders}) => {
  useEffect(() => {
    AOS.init()
  })
  const [folderName, setFolderName ] = useState("")
  const addFolder = (e) => {
    e.preventDefault()
    const {userId} = JSON.parse(localStorage.getItem("user"))
    const data = { userId, folderName }
    axios({
      url: 'http://localhost:8080/api/v1/quiz/create/folder',
      method: "POST",
      headers: setToken(),
      data,
    })
    .then(res => {
      console.log(res)
      setMyFolders(myFolders => [...myFolders, res.data])
    })
    .catch(err => {
      console.log({userId, folderName})
      console.log('폴더 추가하기 실패함')
      console.log(err)
    })
    setFolderName("");
  }


  return (
    <div>
      <Popover placement='top-start'>
          <PopoverTrigger>
            <Image data-aos="fade-up-left" data-aos-duration="1500" alt='더하기' className='plus-button' src={add} />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight='semibold'>
              새로운 폴더 이름을 입력하세요
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
            <form onSubmit={(e) => addFolder(e)}>
                <InputGroup>
                  <Input  onChange={(e) => {setFolderName(e.target.value)}} 
                    value={folderName} autoFocus={true} />
                  <InputRightElement>
                    <Button type='submit' colorScheme="green" variant="ghost">
                      추가
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </form>
            </PopoverBody>
          </PopoverContent>
        </Popover>
    </div>
  );
};

export default AddQuizPopover;

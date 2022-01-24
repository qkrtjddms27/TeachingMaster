import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, 
  PopoverBody, Button, Image, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'
import add from './add.png'
import axios from 'axios'

const AddQuizPopover = ({folders,setFolers}) => {
  const [foldername,setFoldername ] = useState("")
  const addFolder =()=>{
    axios({
      url:`http://localhost:8080/api/v1/quiz/{user_id}/create/folder/`,
      method:"POST",
      // headers: setToken()
      data:{"folderName":foldername,"userId":localStorage.getItem("userId")}
    })
    .then((res)=>{
      console.log(foldername)
      setFoldername("")
      // setFolers([])
    })
      
    .catch((err)=>{
      console.log(foldername)
      setFoldername("");
      console.log(err)})
  }
  return (
    <div>
      <Popover placement='top-start'>
          <PopoverTrigger>
            <Image alt='더하기' className='plus-button' src={add} />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight='semibold'>
              새로운 폴더 이름을 입력하세요
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
            <form onSubmit={()=>addFolder()}>
                <InputGroup>
                  <Input  onChange={(e)=>{setFoldername(e.target.value)}} 
                    value={foldername} />
                  <InputRightElement>
                    <Button type='submit' colorScheme="cyan">
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

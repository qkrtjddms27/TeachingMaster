import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, 
  PopoverBody, Button, Image, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'
import add from './add.png'
import axios from 'axios'
import { setToken  } from '../../TOKEN';

const AddQuizPopover = ({myFolders, setMyFolders}) => {
  const [folderName, setFolderName ] = useState("")
  const addFolder = (e) => {
    e.preventDefault()
    const data = {
      "userId": localStorage.getItem("userId"),
      folderName
    }
    // axios({
    //   url: `http://localhost:8080/api/v1/quiz/create/folder`,
    //   method: "POST",
    //   headers: setToken(),
    //   data,
    // })
    axios({
      url: `http://localhost:8080/api/v1/quiz/create/folder/${data.userId}/${folderName}`,
      method: "POST",
      headers: setToken(),
    })
    .then(res => {
      setMyFolders(myFolders => [...myFolders, res.data])
    })
    .catch(err => {
      console.log(folderName)
      console.log(err)
    })
    setFolderName("");
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

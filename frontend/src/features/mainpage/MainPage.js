import React, { useEffect } from 'react';
import {Heading} from '@chakra-ui/react'
import './scss/mainpage.scss'
import Main1 from './Main1';
import Main2 from './Main2';
import Main3 from './Main3';
import Concert from '../teacher/Concert';
import Main4 from './Main4';
import Main6 from './Main6';
const MainPage = ({setHeader}) => {
  useEffect(()=>{
    setHeader(false)
  },[])
  
  return(
  <div>
    <Main4 />
    {/* <Main1 /> */}
    <Main2/>
    {/* <Main3/> */}
    <Main6 />
    {/* <Concert/> */}
  </div>)
};

export default MainPage;

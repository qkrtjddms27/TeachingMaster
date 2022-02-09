import React, { useEffect } from 'react';
import {Heading} from '@chakra-ui/react'
import './scss/mainpage.scss'
import Main1 from './Main1';
import Main2 from './Main2';
import Main3 from './Main3';
import Main4 from './Main4';
import Main6 from './Main6';
import Concert from '../teacher/Concert';


const MainPage = ({setHeader}) => {
  useEffect(()=>{
    setHeader(false)
  },[])
  
  return(
  <div>
    <Main1 />
    <Main2/>
    <Main3/>
    <Main4 />
    <Main6 />
    <Concert/>
  </div>)
};

export default MainPage;

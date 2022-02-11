import React, { useEffect } from 'react';
import {Heading} from '@chakra-ui/react'
import './scss/mainpage.scss'
import Main1 from './Main1';
import Main2 from './Main2';
import Main4 from './Main4';
import Main5 from './Main5';
import Main3 from './Main3';


const MainPage = ({setHeader}) => {
  useEffect(()=>{
    setHeader(false)
  },[])
  
  return(
  <div>
    {/* <Main1 /> */}
    <Main4 />
    <Main3/>
    <Main2/>
    <Main5 />
  </div>)
};

export default MainPage;

import React, { useEffect } from 'react';
import {Heading} from '@chakra-ui/react'
import Main6 from './Main6';
import Main3 from './Main3';
import Main1 from './Main1';
import Main4 from './Main4';
import Main2 from './Main2';


const MainPage = ({setHeader}) => {
  useEffect(()=>{
    setHeader(false)
  },[])
  
  return(
  <div>
    {/* <Main1 /> */}
    <Main1 />
    <Main2/>
    <Main3/>
    <Main4 />
  </div>)
};

export default MainPage;

import { Button, Heading } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';

const Main2 = () => {
  // const text = document.getElementsByClassName("text")
  // const [i,setI] = useState(0)
  
  // const showText = ()=>{
  //   for (i;i<text.length;setI(i+1)){
  //     text[i].classList.toggle("show")
  //   }}
  return (
  <div className='Main2'>
    {/* <Button onClick={()=>showText()}>버튼</Button> */}
    <div className='text' id="text">
      <p>Showing Text</p>
    </div>
    <div className='text' id="text1">
      <p>Teaching Master</p>
    </div>
    <div className='text' id="text2">
      <p>티칭티칭 마스터</p>
    </div>
  </div>
  )
};

export default Main2;

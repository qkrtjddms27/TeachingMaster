/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import AOS from 'aos'
import "aos/dist/aos.css"
import { useEffect } from "react";
import { Heading } from '@chakra-ui/react';
const Main3 = () => {
  useEffect(()=>{
    AOS.init()
  })
  return (
  <div className='Main3'>
    <img 
    style={{"margin":"30rem"}}
    data-aos="fade-down"
    data-aos-easing="linear"
    data-aos-duration="3000"
    src='https://images.pexels.com/photos/10753697/pexels-photo-10753697.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'/>

    <div style={{"display":"flex"}} data-aos="fade-right" data-aos-easing="linear" data-aos-duration="3000">
      <img 
        style={{"margin":"20rem"}}
        src="https://images.pexels.com/photos/5896527/pexels-photo-5896527.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
      <Heading>아이들에게 희망을 알려주세요</Heading>
    </div>
    
  </div>)
};

export default Main3;

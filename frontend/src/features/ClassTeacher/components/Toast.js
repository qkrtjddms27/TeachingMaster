import React from 'react';
import { useToast, Box, Image } from '@chakra-ui/react';

const Toast = ({ setState, imgSrc, message, color, bg, title }) => {
  const toast = useToast()
  return (
  //   <button className="OnOffButton" title={title}
  //   onClick={() => {
  //     setState()
  //     toast({
  //       position: 'bottom-left',
  //       render: () => (<Box color={color} p={3} bg={bg}>{message}</Box>)
  //     })
  //   }}
  // >
  //   <Icon as={iconAs} w={8} h={8} />
  // </button>
  <Image className="OnOffButton" title={title}
    onClick={() => {
      setState()
      toast({
        position: 'bottom-left',
        render: () => (<Box color={color} p={3} bg={bg}>{message}</Box>)
      })
    }} src={imgSrc} w={8} h={8} />
  );
};

export default Toast;
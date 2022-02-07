import React from 'react';
import { useToast, Box, Icon,Image } from '@chakra-ui/react';

const Toast = ({ setState, iconAs, message, color, bg, title }) => {
  const toast = useToast()
  return (
    <button className="OnOffButton" title={title}
    onClick={() => {
      setState()
      toast({
        position: 'bottom-left',
        render: () => (<Box color={color} p={3} bg={bg}>{message}</Box>)
      })
    }}
  >
    <Image boxSize='100%' className='OnOffButtonimg' src={iconAs} />
  </button>
  );
};

export default Toast;
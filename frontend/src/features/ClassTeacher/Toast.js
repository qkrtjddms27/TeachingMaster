import React from 'react';
import { useToast, Box, Icon } from '@chakra-ui/react';

const Toast = ({ setState, iconAs, change, message, color, bg, title }) => {
  const toast = useToast()
  return (
    <button className="OnOffButton" title={title}
    onClick={() => {
      setState(change)
      toast({
        position: 'bottom-left',
        render: () => (<Box color={color} p={3} bg={bg}>{message}</Box>)
      })
    }}
  >
    <Icon as={iconAs} w={8} h={8} />
  </button>
  );
};

export default Toast;
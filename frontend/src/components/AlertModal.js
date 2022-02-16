import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import React, { useRef } from 'react';
// import { useState } from 'react';


// prop받아서 사용하면 주석처리하고 부모컴포넌트에 state만들고 isOpen과 setIsOpen prop해주기
// prop안받으면 모든 주석 풀고 사용하면 됨
const AlertDialogModal = ({ title, content, isOpen, setIsOpen }) => {
  // const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()


  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {content}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                X
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AlertDialogModal;
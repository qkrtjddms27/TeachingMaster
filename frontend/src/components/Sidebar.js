import './Sidebar.scss'
import {HamburgerIcon,MoonIcon} from '@chakra-ui/icons'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  Avatar
} from '@chakra-ui/react'
import {useDisclosure} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button 
      size="lg"
      className='sidebar-button'
      colorScheme=""
      leftIcon={<HamburgerIcon />}
      onClick={onOpen}>
        메뉴
      </Button>
      <Drawer  placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent >
          <DrawerHeader className='DrawerHeader' borderBottomWidth='1px'>
            <Avatar size="lg" name='Dan Abrahmov' src='https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg' />
            <div className='teacher_name'>이주빈 선생님</div>
          </DrawerHeader>
          <DrawerBody className="DrawerBody">
            <Link onClick={onClose} to="/home"><MoonIcon className='Icon'/>홈</Link>
            <Link onClick={onClose} to="/student"><MoonIcon className='Icon'/>학생</Link>
            <Link onClick={onClose} to="/quiz"><MoonIcon className='Icon'/>퀴즈</Link>
            <Link onClick={onClose} to="/conference"><MoonIcon className='Icon'/>수업중</Link>
            <Link onClick={onClose} to="/myconference"><MoonIcon className='Icon'/>내수업내역</Link>
            <Link onClick={onClose} to="/settings"><MoonIcon className='Icon'/>환경설정</Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
export default Sidebar

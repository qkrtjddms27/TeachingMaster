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

const teacher = {teacher_profile:'https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg'}

function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <HamburgerIcon className='sidebar-button' boxSize={12} onClick={onOpen}/>
      <Drawer  placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent >
          <DrawerHeader className='DrawerHeader' borderBottomWidth='1px'>
          <img className='teacher_image' alt='선생님사진'
              src={teacher.teacher_profile} />
            <div className='teacher_name'>이주빈 선생님</div>
          </DrawerHeader>
          <DrawerBody className="DrawerBody">
            {/* <MoonIcon className='Icon'/> */}
            <Link onClick={onClose} to="/home">홈</Link>
            <Link onClick={onClose} to="/student">학생</Link>
            <Link onClick={onClose} to="/quiz/folder">퀴즈</Link>
            <Link onClick={onClose} to="/conference">수업중</Link>
            <Link onClick={onClose} to="/myconference">내수업내역</Link>
            <Link onClick={onClose} to="/settings">환경설정</Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer> 
    </>
  )
}
export default Sidebar

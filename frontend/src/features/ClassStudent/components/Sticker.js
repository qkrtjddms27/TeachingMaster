import { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image } from '@chakra-ui/react';
import '../scss/StudentModal.scss'
import dinosaur from '../image/퀴즈공룡.png'
import AOS from 'aos'
import "aos/dist/aos.css"

const Sticker = ({ isOpen, onOpen, onClose }) => {
  const me = {
    "student_id": 3,
    "student_name": "새로운",
    "counting_star": 13,
    "student_score": 52,
  }

  const [nums, setNums] = useState([])
  useEffect(() => {
    setNums(Array(20).fill().map((v, i) => i))
    AOS.init()
  }, [])

  return (
    <ModalContent bgColor='#B2CCC1' w='85rem' h='45rem' marginY='7rem' marginX='1rem' >
      <ModalHeader className='student-modal-header'>
        <span style={{"fontSize": "xx-large"}}>내 공룡은 {parseInt(me.student_score/20)}살!</span>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody className='sticker-body'>
        <div className='sticker-left'>
          <Image className='big-dino' src="https://cdn.discordapp.com/attachments/885744368399560725/940498039402037248/Pngtreecute_lively_green_little_dinosaur_4659657.png"
            data-aos="zoom-in-up"
            data-aos-duration="1000" 
          /> 
        </div>
        <div className='sticker-right'>
            {nums.map(num => {
              const dinoUrl = `https://cdn-icons-png.flaticon.com/512/145/${145297+num}.png`
              return (
                <div key={num} className='sticker-mini'>
                  {num < (me.student_score%20) && 
                    <Image src={dinoUrl} className='mini-dino' 
                  />}
                </div>
              )
            })}
        </div>
      </ModalBody>
    </ModalContent>
  );
};

export default Sticker;
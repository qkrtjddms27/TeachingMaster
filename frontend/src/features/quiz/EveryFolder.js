/* eslint-disable react-hooks/exhaustive-deps */
import { folders } from './quizzes'
import {Heading , Popover,PopoverTrigger,PopoverContent,PopoverHeader,PopoverArrow,PopoverCloseButton,PopoverBody, Input, Button} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useCallback } from 'react'
import { Row,Col } from 'react-bootstrap'
const Folder = () => {
  let myImg = 0
  let Imgurl = ""
  const rand = useCallback(()=>{
    myImg = Math.floor(Math.random()*((1081050)-(1081000)+1)+(1081000))
    Imgurl = `https://cdn-icons-png.flaticon.com/512/1081/${myImg}.png`
  },[])
  rand()
  const Imgurl1 = Imgurl
  const Imgurl2 = "https://cdn-icons.flaticon.com/png/512/1550/premium/1550596.png?token=exp=1642788332~hmac=5f67ae3ba1c9c7a28d74441857742f32"
  rand()
  const Imgurl3 = Imgurl
  return (
    <div className="every-folder">
      <Heading className='title'>폴더들</Heading>
      <div className='all-cart-mine'>
        <div className='all'>
          <Link to=""><img className='folder-icon' src={Imgurl1} alt='그림'/></Link>                    
          <Heading className='all-cart-mine-title'>전체보기</Heading>
        </div>
        <div className='cart'>
          <Link to=""><img className='folder-icon' src={Imgurl2} alt='그림'/></Link>          
          <Heading className='all-cart-mine-title'>즐겨찾기</Heading>
        </div>
        <div className='mine'>
          <Link to=""><img className='folder-icon' src={Imgurl3} alt='그림'/></Link>
          <Heading className='all-cart-mine-title'>내가 만든문제</Heading>
        </div>
      </div>
      <div className='folders'>
        <Row className='row'>
          {folders.map(folder=>{
            const url = `/quiz/folder/${folder.id}`;
            rand()
            return (
              <Col className='col' sm = {3} key={folder.id}>
                <div key={url}>
                  <Link to={url}><img className='folder-icon' src={Imgurl} alt='그림'/></Link>
                  <p className='title'>{folder.title}</p>
                </div>
              </Col>
            )})} 
        </Row>
      </div>
      <div>
        <Popover placement='top-start'>
          <PopoverTrigger>
              <img
            onClick={()=>{console.log("hi")}}
            alt='더하기' 
            className='add-button'
            src='https://cdn-icons.flaticon.com/png/512/1550/premium/1550598.png?token=exp=1642788527~hmac=7bc7b9bd5f11065a324615da118a8b0d'
            // src='https://cdn-icons-png.flaticon.com/512/158/158845.png'
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight='semibold'>
              새로운 폴더 이름을 입력하세요
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <input/>
              <Button colorScheme="blackAlpha">추가하기</Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>     
      </div>
    </div>
  )
}

export default Folder

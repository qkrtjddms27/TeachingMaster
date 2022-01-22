

/* eslint-disable react-hooks/exhaustive-deps */
import { folders } from './quizzes'
import { Heading , Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, 
  PopoverBody, Button, Image, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useCallback } from 'react'
import { Row,Col } from 'react-bootstrap'
import star from './star.png'
import add from './add.png'


const Folder = () => {
  let myImg = 0
  let Imgurl = ""
  const rand = useCallback(()=>{
    myImg = Math.floor(Math.random()*((1081050)-(1081000)+1)+(1081000))
    Imgurl = `https://cdn-icons-png.flaticon.com/512/1081/${myImg}.png`
  },[])
  rand()
  const Imgurl1 = Imgurl
  rand()
  const Imgurl3 = Imgurl
  return (
    <div className="every-folder">
      <Heading className='title'>폴더들</Heading>
      {/* <br/> */}
      <div className='all-cart-mine'>
        <div className='all'>
          <Link to=""><img className='folder-icon' src={Imgurl1} alt='그림'/></Link>                    
          <Heading className='all-cart-mine-title'>전체보기</Heading>
        </div>
        <div className='cart'>
          <Link to=""><Image className='folder-icon' src={star} alt='즐겨찾기'/></Link>          
          <Heading className='all-cart-mine-title'>즐겨찾기</Heading>
        </div>
        <div className='mine'>
          <Link to=""><img className='folder-icon' src={Imgurl3} alt='그림'/></Link>
          <Heading className='all-cart-mine-title'>내가 만든문제</Heading>
        </div>
      </div>
      {/* <hr/> */}
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
            <Image onClick={() => {console.log('hi')}} alt='더하기' className='add-button' src={add} />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight='semibold'>
              새로운 폴더 이름을 입력하세요
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <InputGroup>
                <Input />
                <InputRightElement>
                  <Button>추가</Button>
                </InputRightElement>
              </InputGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover>     
      </div>
    </div>
  )
}

export default Folder
/* eslint-disable react-hooks/exhaustive-deps */
import { Heading, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React,{ useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import star from './image/star.png'
import axios from 'axios'
import AddQuizPopover from './AddQuizPopover'
import AOS from 'aos'
import "aos/dist/aos.css"
import { setToken } from '../../components/TOKEN'
const Folder = () => {
  const userId = localStorage.getItem("userId")

  // 폴더에 주는 효과
  useEffect(() => {
    AOS.init()
  })

  // user의 폴더 목록 받기 -> 토큰사용은 나중으로 미룸
  const [myFolders, setMyFolders] = useState([])
  useEffect (() => {
    axios({
      url:`http://localhost:8080/api/v1/quiz/folder/${userId}`,
      method:"GET",
      headers: setToken()
    })
    .then(({data}) => {
      setMyFolders(data)
      // console.log(data)
    })
    .catch(err => {
      console.log(err)
      setMyFolders([])
    })
  }, [])
  
  // 폴더에 사용할 이미지 주소 만들기
  const [imgUrls, setImgUrls] = useState([])
  useEffect(() => {
    const Nums = Array(50).fill().map((v, i) => i+1)
    const shuffle = []
    while (Nums.length > 0) {
      shuffle.push(Nums.splice(Math.floor(Math.random()*Nums.length), 1)[0]+1081000)
    }
    setImgUrls(shuffle.slice(0, myFolders.length+2))
  }, [myFolders])

  const Imgurl1 = `https://cdn-icons-png.flaticon.com/512/1081/${imgUrls[imgUrls.length-1]}.png`
  const Imgurl2 = `https://cdn-icons-png.flaticon.com/512/1081/${imgUrls[imgUrls.length-2]}.png`


  return (
    <div className="every-folder">
      <Heading className='title'>폴더들</Heading>

      <div className='all-cart-mine'>
        <div data-aos="fade-down" data-aos-duration="1500" className='mine'>
          <Link to="/quiz/folder/all"><img className='folder-icon' src={Imgurl1} alt='그림'/></Link>                    
          <Heading className='all-cart-mine-title'>전체보기</Heading>
        </div>
        <div data-aos="fade-up" data-aos-duration="1500" className='mine'>
          <Link to="/quiz/folder/bookmark"><Image className='folder-icon' src={star} alt='즐겨찾기'/></Link>          
          <Heading className='all-cart-mine-title'>즐겨찾기</Heading>
        </div>
        <div data-aos="fade-down" data-aos-duration="1500" className='mine'>
          <Link to="/quiz/folder/imade"><img className='folder-icon' src={Imgurl2} alt='그림'/></Link>
          <Heading className='all-cart-mine-title'>내가 만든문제</Heading>
        </div>
      </div>



      <div className='folders'>
        <Row className='row'>
          {myFolders.map((fd, idx) => {
            const url = `/quiz/folder/${fd.folderId}`;
            const imgUrl = `https://cdn-icons-png.flaticon.com/512/1081/${imgUrls[idx]}.png`
            return (
              <Col className='col' sm = {3} key={idx}>
                <div data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="1500" key={url}
                >
                  <Link to={url}><img className='folder-icon' src={imgUrl} alt='그림'/></Link>
                  <p className='title'>{fd.folderName}</p>
                </div>
              </Col>
            )
          })} 
        </Row>
      </div>



      <div>
        <AddQuizPopover myFolders={myFolders} setMyFolders={setMyFolders}  />
      </div>
    </div>
  )
}

export default Folder
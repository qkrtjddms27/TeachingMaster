/* eslint-disable react-hooks/exhaustive-deps */
import { folders } from './quizzes'
import { Heading, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React,{ useCallback, useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import star from './star.png'
import add from './add.png'
import axios from 'axios'
import AddQuizPopover from './AddQuizPopover'
import AOS from 'aos'
import "aos/dist/aos.css"

const Folder = () => {
  useEffect(()=>{
    AOS.init()
  })
  const user_id = localStorage.getItem("userId")
  const [Imgurls,setImgurls] = useState([])
  const [folderss,setFolderss] = useState(folders)
  const getNumbers = ()=>{
    const Nums = Array(50).fill().map((v,i)=>i+1)
    const shuffle = []
    while (Nums.length>0){
      shuffle.push(Nums.splice(Math.floor(Math.random()*Nums.length),1)[0]+1081000)
    }
    return shuffle.slice(0,folders.length+2)
  }
  useEffect(()=>{
    setImgurls(getNumbers())
  },[folderss])

  // useEffect (()=>{
  //   axios({
  //     url:`http://localhost:8080/api/v1/quiz/{user_id}`,
  //     method:"GET",
  //     // headers: setToken()
  //   })
  //   .then(res=>{
  //     setFolders(res.data.뭔가)
  //   })
  //   .catch(
  //     setFolders([])
  //   )
  // },[])
  const Imgurl1 = `https://cdn-icons-png.flaticon.com/512/1081/${Imgurls[(Imgurls.length)-1]}.png`
  const Imgurl2 = `https://cdn-icons-png.flaticon.com/512/1081/${Imgurls[Imgurls.length-2]}.png`
  return (
    <div className="every-folder">
      <Heading className='title'>폴더들</Heading>
      {/* <br/> */}
      <div className='all-cart-mine'>
        <div data-aos="fade-down" data-aos-duration="1500" className='mine'>
          <Link to="#"><img className='folder-icon' src={Imgurl1} alt='그림'/></Link>                    
          <Heading className='all-cart-mine-title'>전체보기</Heading>
        </div>
        <div data-aos="fade-up" data-aos-duration="1500" className='mine'>
          <Link to="#"><Image className='folder-icon' src={star} alt='즐겨찾기'/></Link>          
          <Heading className='all-cart-mine-title'>즐겨찾기</Heading>
        </div>
        <div data-aos="fade-down" data-aos-duration="1500" className='mine'>
          <Link to="#"><img className='folder-icon' src={Imgurl2} alt='그림'/></Link>
          <Heading className='all-cart-mine-title'>내가 만든문제</Heading>
        </div>
      </div>
      {/* <hr/> */}
      <div className='folders'>
        <Row className='row'>
          {folders.map((folder,index)=>{
            const url = `/quiz/folder/${folder.id}`;
            const Imgurl = `https://cdn-icons-png.flaticon.com/512/1081/${Imgurls[index]}.png`
            return (
              <Col className='col' sm = {3} key={folder.id}>
                <div data-aos="fade-up"
                      data-aos-easing="linear"
                      data-aos-duration="1500" key={url}>
                  <Link to={url}><img className='folder-icon' src={Imgurl} alt='그림'/></Link>
                  <p className='title'>{folder.title}</p>
                </div>
              </Col>
            )})} 
        </Row>
      </div>
      <div>
        <AddQuizPopover folders={folderss} setFolders={setFolderss}  />
      </div>
    </div>
  )
}

export default Folder
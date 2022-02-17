import { Heading, Img,Button, Text } from "@chakra-ui/react";
import {useEffect, useState} from 'react'
import './scss/Main3.scss'
import AOS from 'aos'
import "aos/dist/aos.css"

const Main3 = () => {
  useEffect(()=>{
    AOS.init()
  },[])
  return (
    <div className='Main3'>
      <div className="scroll-down"/>
      <div className="empty_box"/>
      <div  className="tiger"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="linear"
            data-aos-duration="2000"
            id="animal_box" >
        <Img className="icon"  src="https://cdn.discordapp.com/attachments/885744368399560725/940788467040927744/1ebc39a1c15ce4e0.png"/>
        <div className="content">
          <div className="ment">
            <Text>나는 퀴즈를 좋아하는 티랑이야 </Text>
            <p>나랑 문제 풀지 않을래?</p>
          </div>
          <Img src="https://i.ibb.co/hcLch3X/mainquiz.gif"/>
        </div>
      </div>
      <div className="rabbit"
            data-aos="fade-left"
            data-aos-offset="400"
            data-aos-duration="1000"
            id="animal_box">
        <div className="content">
          <div className="ment">
            <p>친구들이 쓰기 좋게</p>
            <p>토토가 쉽게 바꿔놨어요.</p>
          </div>
          <div className="img_box">
            <Img src="https://cdn.discordapp.com/attachments/885744368399560725/940838592413057084/unknown.png"/>
            <Img src="https://cdn.discordapp.com/attachments/885744368399560725/940843036705959966/90b3c558d3543a12.png"/>
          </div>
        </div>
        <Img className="icon" src="https://cdn.discordapp.com/attachments/885744368399560725/940788475651833876/7703323da0dec32a.png"/>
      </div>
      <div className="penguin"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="linear"
            data-aos-duration="1000"
            id="animal_box">
        <Img className="icon" src="https://cdn.discordapp.com/attachments/885744368399560725/940789117434875924/b8cf8311fbac34fb.png"/>
        <div className="content">
          <p>입장은 이몸 펭키가 담당하지!</p>
          <p>자기 반과 학번만 입력하면 쉽게 들어올 수 있어 </p>
        </div>
      </div>
      <div data-aos="fade-left"
            data-aos-offset="300"
            data-aos-easing="linear"
            data-aos-duration="1000"
            className="dino"
            id="animal_box">
        <div className="content">
          <Img src="https://i.ibb.co/Fbbpfd6/Main.gif"/>
          <div className="ment">
            <p>디노의 친구들을 찾아줘 </p>
            <p>수업을 열심히 들으면 친구들이</p>
            <p>놀러 올거야</p>
          </div>
        </div>
        <Img className="icon" src="https://cdn.discordapp.com/attachments/885744368399560725/940789109855748126/d58eac80c7e49975.png"/>
      </div>
      <div  className="bear"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="linear"
            data-aos-duration="1000"
            id="animal_box">
        <Img className="icon" src="https://cdn.discordapp.com/attachments/885744368399560725/940788485227421716/6bc81f0a2e2b6c56.png"/>
        <div className="content">
          <div className="ment">
            <p>선생님, 안녕하세요. </p>
            <p>마곰이 티칭 마스터를 소개할게요 </p>
            <br></br>
            <div className="main-bear">
              <div className="bear-p" id='left'>
                <div>1. 학생 관리 기능(별점, 메모)이 있어요</div>
                <Img className="main-bear-img" src="https://i.ibb.co/sbnysxt/Main.gif"/>
              </div>
              <div className="bear-p">
                <div>2. 하이라이팅 기능(참여도)이 있어요</div>
                <Img className="main-bear-img" src="https://i.ibb.co/bHtsyyp/Main.gif"/>
              </div>
            </div>
            <br></br><br/>
            <div className="main-bear">
              <div className="bear-p" id='left'>
                <div>3. 퀴즈 커뮤니티가 있어요</div>
                <Img className="main-bear-img" src="https://i.ibb.co/vZBH5r0/Main.gif"/>
              </div>
              <div className="bear-p">
                <div>4. 퀴즈와 OX 퀴즈를 출제할 수 있어요</div>
                <Img className="main-bear-img" src="https://i.ibb.co/PD4KqMH/Main-OX.gif"/>
              </div>
            </div>
          </div>
        </div>
      </div>      
      <Button onClick={()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})}} className="movetoTop">꼭대기로</Button>
    </div>
  )
};

export default Main3;

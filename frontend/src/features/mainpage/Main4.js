import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { Component } from 'react'
import './scss/Main4.scss'

export default class Main4 extends Component {
  render() {
    const settings = {
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    const reviews = [
      {
        title: '수업 준비가 수월해졌어요',
        content: '퀴즈를 미리 만들 수가 없어서 수업 시간마다 불편했는데 만들어진 퀴즈를 즐겨찾기에 넣어 수업 시간에 바로 사용할 수 있어서 좋아요!',
        footer: '고현초등학교 익명의 교사'
      },
      {
        title: '화면이 이뻐요!!', 
        content: '원래 수업화면은 좀 딱딱하고 재미없었는데 티칭마스터는 화면이 이쁘고 보기 쉬워서 좋아요!!',
        footer: '사직초등학교 익명의 학생'
      },
      {
        title: '학생들이 수업에 열심히 참여해요', 
        content: '언제 어떤 퀴즈가 갑자기 나타날지 모르니, 학생들이 수업을 전보다 열심히 듣습니다. 고마워요 티칭마스터!',
        footer: '상도초등학교 행복한 교사'
      },
      {
        title: '우리 아이가 이제 수업시간만 기다리네요~', 
        content: '비대면 수업이라 집중을 잘 못하는 것 같아서 걱정 많이 했는데, 퀴즈를 풀고 공룡을 키우는게 재밌어서 수업이 너무 기다려진다네요~ 고마워요 티칭마스터~~',
        footer: '계룡초등학교 모 학생의 학부모'
      },
      {
        title: '수업중에 메모가 되는게 좋네요',
        content: '원래 따로 메모를 했어야 했는데 수업중에 바로 적고, 볼 수 있어서 편리합니다',
        footer: '상상초등학교 정리를 좋아하는 교사'
      },
      {
        title: '공룡이 나보다 나이가 많아요',
        content: '발표를 많이 했더니 공룡이 나보다 나이가 많아졌어요! 사랑해요 티칭마스터!',
        footer: '동작초등학교 공룡보다 어린 학생'
      },
      {
        title: '학습 정도 파악이 편리하네요', 
        content: '실시간으로 학생들의 퀴즈 결과를 볼 수 있고, 나중에도 학생별로 퀴즈결과를 볼 수 있어서 학습 정도를 파악하기 편해서 좋아요',
        footer: '중앙초등학교 교사'
      },
      {
        title: '우리 아이가 달라졌어요', 
        content: '수업 시간에 수업을 안 듣고 게임하는 모습을 보고 몇 번 혼낸 적 있는데 티칭 마스터로 바뀌고 나서 우리 아이가 달라졌어요!!',
        footer: '양덕초등학교 모 학생의 학부모'
      },
    ]
    return (
      <div className="Main4">
        <Slider {...settings}>
          {reviews.map((rv, idx) => (
            <div className="reviews" key={idx}>
              <div className="review">
                <p className="review-title">{rv.title}</p>
                <p className="review-content">{rv.content}</p>
                <p className="review-footer">{rv.footer}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

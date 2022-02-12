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
        title: '학생들이 수업에 열심히 참여해요', 
        content: '언제 어떤 퀴즈가 갑자기 나타날지 모르니, 학생들이 수업을 전보다 열심히 듣습니다. 고마워요 티칭마스터!',
        footer: '싸피초등학교 임명의 교사1'
      },
      {
        title: '공룡이 나보다 나이가 많아요',
        content: '발표를 많이 했더니 공룡이 나보다 나이가 많아졌어요! 사랑해요 티칭마스터!',
        footer: '싸피초등학교 지나가던 학생1'
      },
      {
        title: '학생들이 수업에 열심히 참여해요', 
        content: '언제 어떤 퀴즈가 갑자기 나타날지 모르니, 학생들이 수업을 전보다 열심히 듣습니다. 고마워요 티칭마스터!',
        footer: '싸피초등학교 임명의 교사2'
      },
      {
        title: '공룡이 나보다 나이가 많아요',
        content: '발표를 많이 했더니 공룡이 나보다 나이가 많아졌어요! 사랑해요 티칭마스터!',
        footer: '싸피초등학교 지나가던 학생2'
      },
      {
        title: '학생들이 수업에 열심히 참여해요', 
        content: '언제 어떤 퀴즈가 갑자기 나타날지 모르니, 학생들이 수업을 전보다 열심히 듣습니다. 고마워요 티칭마스터!',
        footer: '싸피초등학교 임명의 교사3'
      },
      {
        title: '공룡이 나보다 나이가 많아요',
        content: '발표를 많이 했더니 공룡이 나보다 나이가 많아졌어요! 사랑해요 티칭마스터!',
        footer: '싸피초등학교 지나가던 학생3'
      },
      {
        title: '학생들이 수업에 열심히 참여해요', 
        content: '언제 어떤 퀴즈가 갑자기 나타날지 모르니, 학생들이 수업을 전보다 열심히 듣습니다. 고마워요 티칭마스터!',
        footer: '싸피초등학교 임명의 교사4'
      },
      {
        title: '공룡이 나보다 나이가 많아요',
        content: '발표를 많이 했더니 공룡이 나보다 나이가 많아졌어요! 사랑해요 티칭마스터!',
        footer: '싸피초등학교 지나가던 학생4'
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

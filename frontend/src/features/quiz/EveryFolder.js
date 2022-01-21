/* eslint-disable react-hooks/exhaustive-deps */
import { folders } from './quizzes'
import  {Heading} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useCallback } from 'react'

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
  const Imgurl2 = Imgurl
  rand()
  const Imgurl3 = Imgurl
  return (
    <div className="every-folder">
      <Heading className='title'>폴더목록</Heading>
      <div className='all-cart-mine'>
        <div className='all'>
          <Link><img className='folder-icon' src={Imgurl1} alt='그림'/></Link>                    
          <Heading className='all-cart-mine-title'>전체보기</Heading>
        </div>
        <div className='cart'>
          <Link><img className='folder-icon' src={Imgurl2} alt='그림'/></Link>          
          <Heading className='all-cart-mine-title'>즐겨찾기</Heading>
        </div>
        <div className='mine'>
          <Link><img className='folder-icon' src={Imgurl3} alt='그림'/></Link>
          <Heading className='all-cart-mine-title'>내가 만든문제</Heading>
        </div>
      </div>

      <div className='folders'>
        {folders.map((folder)=>{
        const url = `/quiz/folder/${folder.id}`;
        rand()
        Imgurl = `https://cdn-icons-png.flaticon.com/512/1081/${myImg}.png`
        return (
          <div key={url}>
            <Link to={url}><img className='folder-icon' src={Imgurl} alt='그림'/></Link>
            {folder.title}
          </div>
          )})}
      </div>
    </div>
  )
}

export default Folder

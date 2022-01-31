import { Heading } from "@chakra-ui/react";
import {useState} from 'react'

const IMGINPUT = () => {

  const [imgBase64,setImagbase64]=useState("") // 파일 base64
  const [imgFile,setImgFile] = useState([]) // 이미지파일
  
  const handleChangeFile = event => {
    let reader = new FileReader(); 
    reader.onloadend = e => {
      // 2. 읽기가 완료되면 아래코드가 실행
      const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
      if (base64) {
        setImagbase64(base64.toString())
      }
    };
    if (event.target.files[0]) {
      console.log(event)
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
      setImgFile(event.target.files[0])
      // console.log(event.target.files[0])
    }
    console.log(imgBase64.length)
    // console.log(imgFile)
  };
  const handleRemove = () => {
    setImgFile("")
    setImagbase64("")
  };
  return (
    <div className='Main2'>
      <div className="input_item">
          <div className="input_title">대표이미지</div>
        </div>
        <div className="img_upload">
          <div className="img_preview" placeholder="이미지 파일을 추가해주세요">
            {imgBase64 ? (
              <img src={imgBase64} alt="" onClick={()=>{handleRemove()}}></img>
            ) : (
              <div></div>
            )}
          </div>
          <div >
            <label htmlFor="ex_file" onChange={handleChangeFile}>
              파일첨부
            </label>
            <input
              type="file"
              name="imgFile"
              id="ex_file"
              onChange={handleChangeFile}
            />
          </div>
        </div>
    </div>
  )
};
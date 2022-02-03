import { Button, Box, Text,Input, useDisclosure, useToast, Icon } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import "./scss/ClassTeacher.scss"
import teacher_screen_img from './image/수업화면.png'
import StudentScreen from './StudentScreen';
import TeacherModal from './ModalPage/TeacherModal';
import { BsMicMute, BsFillMicFill, BsCameraVideoOff, BsFillCameraVideoFill, BsFillStarFill } from "react-icons/bs"
import { MdExtension, MdOutlineExtensionOff, MdQuiz } from "react-icons/md"
import { GiCoffeeCup } from "react-icons/gi"
import { FaSchool } from "react-icons/fa"
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from '../openVidu/UserVideoComponent';

const OPENVIDU_SERVER_URL = 'https://i6e107.p.ssafy.io:443';
const OPENVIDU_SERVER_SECRET = 'ssafy';

const ClassTeacher = ({setOnAir}) => {
  let history = useHistory()
  useEffect(()=>{
    setOnAir(true)
    setSession(undefined)
    window.addEventListener('beforeunload', onbeforeunload)
    return () => window.removeEventListener('beforeunload', onbeforeunload)
  },[])

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  const [modalForm, setModalForm] = useState()
  const modalOpen = (kind) => {
    setModalForm(kind)
    onOpen()
  }
  const toast = useToast()
  const [videostate, setVideostate] = useState(true)
  const [audiostate, setAudiostate] = useState(true)
  const [highlighting, setHighlighting] = useState(false)
  const [breaktime, setBreaktime] = useState(false) 
  const [mySessionId, setMySessionId] = useState('TM')
  const [myUserName, setMyUserName] = useState('')
  const [session, setSession] = useState([])
  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [publisher, setPublisher] = useState(undefined)
  const [subscribers, setSubscribers] = useState([])
  let OV = null

  const onbeforeunload = (e) => {
    leaveSession()
  }

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  }

  const deleteSubscriber = (streamManager) => {
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers(subscribers)
    }
  }

  const leaveSession = () => {

    const mySession = session;
    if (mySession) {
        mySession.disconnect();
    }
    // Empty all properties...
    OV = null;
    setSession(undefined)
    setSubscribers([])
    setMySessionId('')
    setMyUserName('')
    setMainStreamManager(undefined)
    setPublisher(undefined)
  }

  const joinSession = (e) => {
    e.preventDefault();
    OV = new OpenVidu();
    setSession(OV.initSession())
    const joinFunction = () => {
      let mySession = session;

      session.on('streamCreated', (event) => {
        let subscriber = mySession.subscribe(event.stream, undefined);
        setSubscribers(subscribers.concat(subscriber))
      });

      mySession.on('streamDestroyed', (event) => {
        deleteSubscriber(event.stream.streamManager);
      });

      mySession.on('exception', (exception) => {
        console.warn(exception);
      });

      getToken().then((token) => {
        mySession
          .connect(
            token,
            { clientData: myUserName },
          )
          .then(() => {
            let publisher = OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
            });
            mySession.publish(publisher);
            setMainStreamManager(publisher)
            setPublisher(publisher)
          })
          .catch((error) => {
              console.log('There was an error connecting to the session:', error.code, error.message);
          });
      });
    }
    joinFunction()
  }

  const getToken = () => {
    return createSession(mySessionId).then((sessionId) => createToken(sessionId));
  }

  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({ customSessionId: sessionId });
        axios
            .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                headers: {
                    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('CREATE SESION', response);
                resolve(response.data.id);
            })
            .catch((response) => {
                var error = Object.assign({}, response);
                if (error?.response?.status === 409) {
                    resolve(sessionId);
                } else {
                    console.log(error);
                    console.warn(
                        'No connection to OpenVidu Server. This may be a certificate error at ' +
                        OPENVIDU_SERVER_URL,
                    );
                    if (
                        window.confirm(
                            'No connection to OpenVidu Server. This may be a certificate error at "' +
                            OPENVIDU_SERVER_URL +
                            '"\n\nClick OK to navigate and accept it. ' +
                            'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                            OPENVIDU_SERVER_URL +
                            '"',
                        )
                    ) {
                        window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                    }
                }
            });
    });
  }

  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
        let data = {};
        axios
            .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
                headers: {
                    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('TOKEN', response);
                resolve(response.data.token);
            })
            .catch((error) => reject(error));
    });
  }

  return (
    <div className='ClassTeacher'>
      {session === undefined && (
        <div id="join">
            <div id="join-dialog" className="jumbotron vertical-center">
                <h1> Join a video session </h1>
                <form className="form-group" onSubmit={joinSession}>
                    <p>
                        <label>Participant: </label>
                        <input
                            className="form-control"
                            type="text"
                            id="userName"
                            value={myUserName}
                            onChange={(e)=>{setMyUserName(e.target.value)}}
                            required
                        />
                    </p>
                    <p>
                        <label> Session: </label>
                        <input
                            className="form-control"
                            type="text"
                            id="sessionId"
                            value={mySessionId}
                            onChange={(e)=>{setMySessionId(e.target.value)}}
                            required
                        />
                    </p>
                    <p className="text-center">
                      <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                    </p>
                </form>
            </div>
        </div>
    )}
    {session !== undefined && (
      <Box className='Conference_box'>
        <div className='top'>
          <div className='student_box'>
            {publisher !== undefined && (
                <div>
                  <StudentScreen 
                    streamManager={publisher} />
                </div>
            )}
            {subscribers.map((sub, i) => (
                <div key={i}>
                  <StudentScreen 
                    streamManager={sub} />
                </div>
            ))}

          </div>
          <div className='chatting_box'>
            <div style={{height:"1rem"}}/>
            <div className='chatting_log'>
              <div style={{height:"1rem"}} />
              <div className='text'>
                <div className='chat_line'>
                  <span className='chat_name'>현홍</span>
                  <div className='chat_content'>안녕안녕안녕안녕안녕안녕안안녕안안녕안안녕안녕</div><br/>
                </div>
                <div className='chat_line'>
                  <span className='chat_name'>혜진</span><span className='chat_content'> 안녕</span><br/>
                </div>
            </div>
            </div>
              <Input className='input_box'/>
          </div>
        </div>






        <div className='bottom'>
          <div className='left_btn_box'>
            <Button className='exitButton' 
              onClick={() => {
                leaveSession()
                history.push('/home')
                setOnAir(false)
              }}
            >수업 나가기</Button>
          </div>
          <div className='right_btn_box'>
            <button className='OnOffButton' title='OX 퀴즈'
              onClick={() => modalOpen('ox')}
            ><Icon as={MdQuiz} w={8} h={8} /></button>
            <button className='OnOffButton' title='즐겨찾기 퀴즈'
              onClick={() => modalOpen('bookmark')}
            ><Icon as={BsFillStarFill} w={8} h={8} /></button>
            <TeacherModal isOpen={isOpen} onClose={onClose} modalForm={modalForm} setModalForm={setModalForm} />
            {videostate ? (
              <button className="OnOffButton" title='Video Off'
                onClick={() => {
                  setVideostate(false)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box color="white" p={3} bg="red.500">카메라를 껐습니다</Box>)
                  })
                }}
              >
                <Icon as={BsFillCameraVideoFill} w={8} h={8} />
              </button>
              ) : (
              <button className="OnOffButton" title='Video On'
                onClick={() => {
                  setVideostate(true)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box color="white" p={3} bg="blue.500">카메라를 켰습니다</Box>)
                  })
                }}
              >
                <Icon as={BsCameraVideoOff} w={8} h={8} />
              </button>
            )}  
            {audiostate ? (
              <button className="OnOffButton" title='Mic Off'
                onClick={() => {
                  setAudiostate(false)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box color="white" p={3} bg="orange.500">마이크를 껐습니다</Box>)
                  })
                }}
              >
                <Icon as={BsFillMicFill} w={8} h={8} />
              </button>
              ) : (
              <button className="OnOffButton" title='Mic On'
                onClick={() => {
                  setAudiostate(true)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box color="white" p={3} bg="blue.200">마이크를 켰습니다</Box>)
                  })
                }}
              >
                <Icon as={BsMicMute} w={8} h={8} />
              </button>
            )}
            {highlighting ? (
              <button className="OnOffButton" title='하이라이팅 끄기'
                onClick={() => {
                  setHighlighting(false)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box p={3} bg="red.100">하이라이팅을 껐습니다</Box>)
                  })
                }}
              >
                <Icon as={MdExtension} w={8} h={8} />
              </button>
              ) : (
              <button className="OnOffButton" title='하이라이팅 끄기'
                onClick={() => {
                  setHighlighting(true)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box p={3} bg="blue.100">하이라이팅을 켰습니다</Box>)
                  })
                }}
              >
                <Icon as={MdOutlineExtensionOff} w={8} h={8} />
              </button>
            )}
            {breaktime ? (
              <button className="OnOffButton" title='수업 시작하기'
                onClick={() => {
                  setBreaktime(false)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box p={3} bg="orange.100">쉬는시간이 끝났습니다</Box>)
                  })
                }}
              >
                <Icon as={GiCoffeeCup} w={8} h={8} />
              </button>
              ) : (
              <button className="OnOffButton" title='쉬는시간 갖기'
                onClick={() => {
                  setBreaktime(true)
                  toast({
                    position: 'bottom-left',
                    render: () => (<Box p={3} bg="green.100">쉬는시간 입니다</Box>)
                  })
                }}
              >
                <Icon as={FaSchool} w={8} h={8} />
              </button>
            )}
          </div>
        </div>
      </Box>)}
    </div>
  );
};

export default ClassTeacher;
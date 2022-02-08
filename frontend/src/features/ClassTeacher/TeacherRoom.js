/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component,createRef } from 'react';
import { Button, Box, Input } from '@chakra-ui/react';
import "./scss/ClassTeacher.scss"
import TeacherModal from './components/TeacherModal';
import { BsMicMute, BsFillMicFill, BsCameraVideoOff, BsFillCameraVideoFill, BsFillStarFill } from "react-icons/bs"
import { MdExtension, MdOutlineExtensionOff, MdQuiz } from "react-icons/md"
import { GiCoffeeCup } from "react-icons/gi"
import { FaSchool } from "react-icons/fa"
import { withRouter } from 'react-router-dom';
import Toast from './components/Toast';
import UserVideoComponent from './openVidu/UserVideoComponent';
import Messages from './components/Messages';
import StudentScreen from './components/StudentScreen'


// const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_URL = 'https://i6e107.p.ssafy.io:443';
const OPENVIDU_SERVER_SECRET = 'ssafy';
const user = JSON.parse(localStorage.getItem('user'))

class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // OV
      mySessionId: this.props.match.params.roomId,
      myUserName: user.userName,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      // TM
      total :0,
      messages: [],
      message: '',
      videostate: true,
      audiostate: false,
      highlighting: false,
      breaktime: false,
    };

    // OV
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    // 채팅
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
    this.messageContainer = createRef(null);
    this.sendmessageByClick = this.sendmessageByClick.bind(this);
    this.sendmessageByEnter = this.sendmessageByEnter.bind(this);
    // TM
    this.handleHistory = this.handleHistory.bind(this)
    this.changeVideostate = this.changeVideostate.bind(this)
    this.changeAudiostate = this.changeAudiostate.bind(this)
    this.changeHighlightingstate = this.changeHighlightingstate.bind(this)
    this.changeBreaktimestate = this.changeBreaktimestate.bind(this)
  }


  // TM
  changeVideostate() {
    this.state.publisher.publishVideo(!this.state.videostate);
    this.setState({
      videostate: !this.state.videostate
    })
  }

  changeAudiostate() {
    this.state.publisher.publishAudio(!this.state.audiostate);
    this.setState({
      audiostate: !this.state.audiostate
    })
  }
  
  changeHighlightingstate() {
    let total = 0
    // eslint-disable-next-line no-lone-blocks
    {this.state.subscribers.map((sub) => (
      total = total + Number(JSON.parse(sub.stream.connection.data).weeklyStar)
    ))}
    total = total/(this.state.subscribers).length
    this.setState({
      highlighting: !this.state.highlighting,
      total: total
    })
  }
  
  changeBreaktimestate() {
    this.setState({
      breaktime: !this.state.breaktime
    })
  }

  handleHistory(path) {
    this.props.history.push(path)
  }


  // OV
  componentDidUpdate(previousProps, previousState) {
    if (this.refs.chatoutput != null) {
      this.refs.chatoutput.scrollTop = this.refs.chatoutput.scrollHeight;
    }
  } 
  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    this.leaveSession()
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChatMessageChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  sendmessageByClick() {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          userName: this.state.myUserName,
          text: this.state.message,
          chatClass: 'messages__item--operator',
        },
      ],
    });
  
    const mySession = this.state.session;
    mySession.signal({
      data: `${this.state.myUserName},${this.state.message}`,
      to: [],
      type: 'chat',
    });
  
    this.setState({
      message: '',
    });
  }

  sendmessageByEnter(e) {
    if (e.key === 'Enter') {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            userName: this.state.myUserName,
            text: this.state.message,
            chatClass: 'messages__item--operator',
          },
        ],
      });
      const mySession = this.state.session;

      mySession.signal({
        data: `${this.state.myUserName},${this.state.message}`,
        to: [],
        type: 'chat',
      });

      this.setState({
        message: '',
      });
    }
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---
    this.OV = new OpenVidu();

    // --- 2) Init a session ---
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        // console.log('*****OV.init: ', this.OV.initSession())
        // console.log('*****state.session: ', this.state.session)
        let mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---
        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          let subscriber = mySession.subscribe(event.stream, undefined);

          let subscribers = this.state.subscribers;
          subscribers.push(subscriber);
          subscriber['student'] = false
          subscriber['teacher'] = true
          console.log('늦은 교사', subscriber)
          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });
        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });
        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
          console.warn(exception);
        });
        mySession.on('signal:chat', (event) => {
          let chatdata = event.data.split(',');
          if (chatdata[0] !== this.state.myUserName) {
            this.setState({
              messages: [
                ...this.state.messages,
                {
                  userName: chatdata[0],
                  text: chatdata[1],
                  chatClass: 'messages__item--visitor',
                },
              ],
            });
          }
        });
        
        this.getToken().then((token) => {
          mySession
            .connect(
              token,
              { clientData: this.state.myUserName, role:"teacher" },
            )
            .then(() => {
              // --- 5) Get your own camera stream ---
              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: true, // Whether to mirror your local video or not
              });
              // publisher['teacher'] = true
              // publisher['student'] = false
              // console.log('1등 교사', publisher)
              // --- 6) Publish your stream ---
              mySession.publish(publisher);
              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log('There was an error connecting to the session:', error.code, error.message);
            });
          }
        );
      },
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }
    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: this.props.match.params.roomId,
      myUserName: user.userName,
      mainStreamManager: undefined,
      publisher: undefined
    });
  }


  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div className="ClassTeacher">
        {/* 세션에 참가하기 전 */}
        {this.state.session === undefined && (
          <div className="login_box"> 
              <form className="form-group" onSubmit={this.joinSession}>
                <img className="teacher_img" src={user.userProfile} alt="선생님사진"/>
              <div>
              <span className="label-control">선생님 : </span>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                    disabled
                  /> 
                </div>
                <br/>
                <div>
                  <span className="label-control"> 교실번호 : </span>
                  <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </div>
                <div className="btn_box">           
                    <Button size="lg" colorScheme='linkedin' className="submit_button" type="submit" >입장하기</Button>
                </div>
              </form>
          </div>
        )}

        {/* 세션에 참가한 후 */}
        {this.state.session !== undefined && (
          <Box className='Conference_box'>
            {/* 상단 */}
            <div className='top'>
              {/* 영상 받아오는 상자 */}
              <div className='student_box'>
                {this.state.subscribers.map((sub, i) => (
                  <div key={i}>
                    {/* <UserVideoComponent streamManager={sub} />  */}
                    <StudentScreen highlighting={this.state.highlighting} total={this.state.total}  streamManager={sub} />
                  </div>
                ))}
                {this.state.publisher !== undefined && (
                  <div>
                    {/* <UserVideoComponent streamManager={this.state.publisher} /> */}
                    <UserVideoComponent score="teacherScore" streamManager={this.state.publisher} />
                  </div>
                )}
              </div>
              {/* 채팅 상자 */}
              <div className='chatting_box'>
                  <div className="chatting_log" ref="chatoutput" id='chatting_scroll'>
                    <Messages messages={this.state.messages} />
                  </div>
                  <Input
                    className='input_box'
                    id="chat_message"
                    type="text"
                    placeholder="Write a message..."
                    onChange={this.handleChatMessageChange}
                    onKeyPress={this.sendmessageByEnter}
                    value={this.state.message}
                  />
              </div>
            </div>
            {/* 하단 */}
            <div className='bottom'>
              <div className='left_btn_box'>
                <Button className='exitButton' onClick={() => {
                  this.leaveSession()
                  this.handleHistory('/home')
                  }}
                >
                  수업 나가기
                </Button>
              </div>
              <div className='right_btn_box'>
                <TeacherModal kind='ox' iconAs={MdQuiz} title='즐겨찾기 퀴즈' />
                <TeacherModal kind='bookmark' iconAs={BsFillStarFill} title='OX 퀴즈' />
                {this.state.videostate ? (
                  <Toast setState={this.changeVideostate} iconAs={BsFillCameraVideoFill} title='Video Off'
                    change={false} message={'카메라를 껐습니다'} color={'white'} bg={'red.500'} />
                  ) : (
                  <Toast setState={this.changeVideostate} iconAs={BsCameraVideoOff} title='Video On'
                    change={true} message={'카메라를 켰습니다'} color={'white'} bg={'blue.500'} />
                )}  
                {this.state.audiostate ? (
                  <Toast setState={this.changeAudiostate} iconAs={BsFillMicFill} title='Mic Off'
                    message={'마이크를 껐습니다'} color={'white'} bg={'orange.500'} />
                  ) : (
                  <Toast setState={this.changeAudiostate} iconAs={BsMicMute} title='Mic On'
                    message={'마이크를 켰습니다'} color={'white'} bg={'blue.200'} />
                )}
                {this.state.highlighting ? (
                  <Toast setState={this.changeHighlightingstate} iconAs={MdExtension} title='하이라이팅 끄기'
                    change={false} message={'하이라이팅을 껐습니다'} color={'black'} bg={'red.100'} />
                    ) : (
                  <Toast setState={this.changeHighlightingstate} iconAs={MdOutlineExtensionOff} title='하이라이팅 켜기'
                    change={true} message={'하이라이팅을 켰습니다'} color={'black'} bg={'blue.100'} />
                )}
                {this.state.breaktime ? (
                  <Toast setState={this.changeBreaktimestate} iconAs={GiCoffeeCup} title='수업 시작하기'
                    change={false} message={'쉬는시간이 끝났습니다'} color={'black'} bg={'orange.100'} />
                    ) : (
                  <Toast setState={this.changeBreaktimestate} iconAs={FaSchool} title='쉬는시간 갖기'
                    change={true} message={'쉬는시간 입니다'} color={'black'} bg={'green.100'} />
                )}
              </div>
            </div>
          </Box>
        )}
      </div>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
  }

  createSession(sessionId) {
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
          let error = Object.assign({}, response);
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
        }
      );
    });
  }

  createToken(sessionId) {
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
      }
    );
  }
}

export default withRouter(Classroom);

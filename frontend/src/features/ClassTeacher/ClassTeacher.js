/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component,createRef } from 'react';
import { Button, Box, Text,Input, useDisclosure, useToast, Icon } from '@chakra-ui/react';
import "./scss/ClassTeacher.scss"
import StudentScreen from './StudentScreen';
import TeacherModal from './ModalPage/TeacherModal';
import { BsMicMute, BsFillMicFill, BsCameraVideoOff, BsFillCameraVideoFill, BsFillStarFill } from "react-icons/bs"
import { MdExtension, MdOutlineExtensionOff, MdQuiz } from "react-icons/md"
import { GiCoffeeCup } from "react-icons/gi"
import { FaSchool } from "react-icons/fa"
import { withRouter } from 'react-router-dom';
import Toast from './Toast';
import UserVideoComponent from '../openVidu/UserVideoComponent';
import Messages from './components/Messages';


// const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_URL = 'https://i6e107.p.ssafy.io:443';
const OPENVIDU_SERVER_SECRET = 'ssafy';


class Classroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // OV
      mySessionId: 'test',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      // TM
      messages: [],
      message: '',
      modalForm: null,
      isModalOpen: false,
      videostate: false,
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
    this.changeModalForm = this.changeModalForm.bind(this)
    this.modalOpen = this.modalOpen.bind(this)
    this.modalClose = this.modalClose.bind(this)
    this.changeVideostate = this.changeVideostate.bind(this)
    this.changeAudiostate = this.changeAudiostate.bind(this)
    this.changeHighlightingstate = this.changeHighlightingstate.bind(this)
    this.changeBreaktimestate = this.changeBreaktimestate.bind(this)
  }


  // TM
  changeModalForm(kind) {
    this.setState({
      modalForm: kind
    })
  }

  modalOpen(kind) {
    this.changeModalForm(kind)
    this.setState({
      isModalOpen: true
    })
  }

  modalClose() {
    this.setState({
      isModalOpen: false
    })
  }

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
    this.setState({
      highlighting: !this.state.highlighting
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
        console.log('*****state.session: ', this.state.session)
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---
        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

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
              { clientData: this.state.myUserName, master:"teacher" },
            )
            .then(() => {
              // --- 5) Get your own camera stream ---
              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: true, // Whether to mirror your local video or not
              });
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
      mySessionId: 'test',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined
    });
  }


  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div className="ClassTeacher">
          {/* 입장 */}
          {this.state.session === undefined && (
              <div id="join">
                  <div id="join-dialog" className="jumbotron vertical-center">
                      <form className="form-group" onSubmit={this.joinSession}>
                          <p>
                              <label>Participant: </label>
                              <input
                                  className="form-control"
                                  type="text"
                                  id="userName"
                                  value={myUserName}
                                  onChange={this.handleChangeUserName}
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
                                  onChange={this.handleChangeSessionId}
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



{this.state.session !== undefined && (
<Box className='Conference_box'>
  <div className='top'>
    <div className='student_box'>
      {this.state.publisher !== undefined && (
          <div>
            {/* <StudentScreen 
              streamManager={this.state.publisher} /> */}
            <UserVideoComponent streamManager={this.state.publisher} />
          </div>
      )}
      {this.state.subscribers.map((sub, i) => (
        <div key={i}>
            <UserVideoComponent streamManager={sub} /> 
            {/* <StudentScreen streamManager={sub} /> */}
          </div>
      ))}

    </div>
    <div className='chatting_box'>
      
      <div style={{height:"1rem"}}/>
      <div className="chat chatbox__support chatbox--active">
        <div className="chat chatbox__header" />
        <div className="chatbox__messages" ref="chatoutput">
          {/* {this.displayElements} */}
          <Messages messages={this.state.messages} />
          <div />
        </div>
        <div className="chat chatbox__footer">
          <input
            id="chat_message"
            type="text"
            placeholder="Write a message..."
            onChange={this.handleChatMessageChange}
            onKeyPress={this.sendmessageByEnter}
            value={this.state.message}
          />
          <p
            className="chat chatbox__send--footer"
            onClick={this.sendmessageByClick}
          >
            Send
          </p>
        </div>
      {/* <div className='chatting_log'>
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
      </div> */}
    </div>
  </div>
</div>






  <div className='bottom'>
    <div className='left_btn_box'>
      <Button className='exitButton' onClick={() => {this.leaveSession()}}>
          수업 나가기
      </Button>
    </div>
    <div className='right_btn_box'>
      <button className='OnOffButton' title='OX 퀴즈'
        onClick={() => this.modalOpen('ox')}
      ><Icon as={MdQuiz} w={8} h={8} /></button>
      <button className='OnOffButton' title='즐겨찾기 퀴즈'
        onClick={() => this.modalOpen('bookmark')}
      ><Icon as={BsFillStarFill} w={8} h={8} /></button>
      <TeacherModal isOpen={this.isModalOpen} onClose={this.modalClose} modalForm={this.state.modalForm} setModalForm={this.changeModalForm} />
      {this.state.videostate ? (
        <Toast setState={this.changeVideostate} iconAs={BsFillCameraVideoFill} title={'Video Off'}
          change={false} message={'카메라를 껐습니다'} color={'white'} bg={'red.500'} />
        ) : (
          <Toast setState={this.changeVideostate} iconAs={BsCameraVideoOff} title={'Video On'}
          change={true} message={'카메라를 켰습니다'} color={'white'} bg={'blue.500'} />
      )}  
      {this.state.audiostate ? (
        <Toast setState={this.changeAudiostate} iconAs={BsFillMicFill} title={'Mic Off'} 
          message={'마이크를 껐습니다'} color={'white'} bg={'orange.500'} />
        ) : (
        <Toast setState={this.changeAudiostate} iconAs={BsMicMute} title={'Mic On'}
          message={'마이크를 켰습니다'} color={'white'} bg={'blue.200'} />
      )}


      {this.state.highlighting ? (
          <Toast setState={this.changeHighlightingstate} iconAs={MdExtension} title={'하이라이팅 끄기'}
          change={false} message={'하이라이팅을 껐습니다'} color={'black'} bg={'red.100'} />
          ) : (
          <Toast setState={this.changeHighlightingstate} iconAs={MdOutlineExtensionOff} title={'하이라이팅 켜기'}
          change={true} message={'하이라이팅을 켰습니다'} color={'black'} bg={'blue.100'} />
      )}


      {this.state.breaktime ? (
          <Toast setState={this.changeBreaktimestate} iconAs={GiCoffeeCup} title={'수업 시작하기'}
          change={false} message={'쉬는시간이 끝났습니다'} color={'black'} bg={'orange.100'} />
          ) : (
          <Toast setState={this.changeBreaktimestate} iconAs={FaSchool} title={'쉬는시간 갖기'}
          change={true} message={'쉬는시간 입니다'} color={'black'} bg={'green.100'} />
      )}
  </div>
  </div>
</Box>)}
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
      var data = JSON.stringify({ customSessionId: sessionId });
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
        }
      );
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = {};
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

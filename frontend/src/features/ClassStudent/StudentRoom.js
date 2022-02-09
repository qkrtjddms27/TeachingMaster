/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component,createRef } from 'react';
import { Button, Box, Input,Image } from '@chakra-ui/react';
import "./scss/ClassStudent.scss"
import { withRouter } from 'react-router-dom';
import Toast from './components/Toast';
import UserVideoComponent from './openVidu/UserVideoComponent';
import Messages from './components/Messages';
import StudentModal from './components/StudentModal';

import micOn from './image/말할래요.png'
import micOff from './image/쉿버튼.png'
import CamOn from './image/카메라켜기.png'
import CamOff from './image/카메라끄기.png'

// import quizDino from './image/퀴즈공룡.png'
const quizDino = "https://cdn.discordapp.com/attachments/885744368399560725/940498039402037248/Pngtreecute_lively_green_little_dinosaur_4659657.png"
const OPENVIDU_SERVER_URL = 'https://i6e107.p.ssafy.io:443';
const OPENVIDU_SERVER_SECRET = 'ssafy';

class StudentRoom extends Component {
  constructor(props) {
    super(props);
    const student = this.props.student
    this.state = {
      // OV
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      // TM
      student : student,
      messages: [],
      message: '',
      videostate: true,
      audiostate: false,
      highlighting: false,
      breaktime: false,
      mySessionId: 'ssafy' + (parseInt(student.roomGrade)*100 + parseInt(student.roomNum)),
      myUserName: student.studentName,

      //quiz
      quizs:[],
      quizId: '',
      subject: '',
      quizPhoto: '',
      quizTitle: '',
      quizContents: '',
      quizAnswer: '',
      openStatus: true,
      quizTimeout: '',
      quizGrade: '',
      userId:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',

      results:[],
      studentAnswer:'',

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
    this.sendmessageByEnter = this.sendmessageByEnter.bind(this);
    // TM
    this.handleHistory = this.handleHistory.bind(this)
    this.changeVideostate = this.changeVideostate.bind(this)
    this.changeAudiostate = this.changeAudiostate.bind(this)
    this.modalPop = this.modalPop.bind(this)

    // quiz
    //학생 결과 전송
    this.sendresultHandle = this.sendresultHandle.bind(this);
  }


  // TM
  modalPop(kind) {
    this.props.modalOpen(kind)
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
  
  handleHistory(path) {
    this.props.history.push(path)
  }


  // OV
  componentDidUpdate(previousProps, previousState) {
    if (this.refs.chatoutput != null) {
      this.refs.chatoutput.scrollTop = this.refs.chatoutput.scrollHeight;
      // this.setState({student:JSON.parse(localStorage.getItem('student'))}) 
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

  //quiz 학생 결과 전송
  sendresultHandle(){
    const mySession = this.state.session;
    mySession.signal({
      data:`${this.state.student.studentId},${sessionStorage.getItem('quizId')},${sessionStorage.getItem('studentresult')}`,
      to: [],
      type: 'studentQuizresult',
    });
    console.log("result---handle")
    console.log("됩니다됩니다됩니다됩니다됩니다됩니다됩니다됩니다됩니다됩니다")

    this.setState({
      studentAnswer:'',
      quizs:[]
    });
    sessionStorage.removeItem('studentresult');
  }

  
  joinSession() {
    this.OV = new OpenVidu();
    console.log("join!")
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {

        let mySession = this.state.session;
        
        mySession.on('streamCreated', (event) => {

          let subscriber = mySession.subscribe(event.stream, undefined);
          let subscribers = this.state.subscribers;
          subscribers.push(subscriber);

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
        
        //quiz
        //ox용
        mySession.on('signal:quiz', (event) => {
          let quizdata = JSON.parse(event.data);
            this.setState({
              quizs: [
                ...this.state.quizs,
                {
                  quizContents:quizdata.value,
                  quizAnswer:quizdata.ans,
                  
                  chatClass: 'quizs__item--visitor',
                },
              ],
              
            });            
          });

        //북마크 용 quiz
        mySession.on('signal:bookmarkQuiz', (event) => {
        
          let quizdata = JSON.parse(event.data);
          // console.log('*********************************')
          // console.log('quizdata', quizdata)
          // console.log('*********************************')
          this.setState({
            quizs: [
              ...this.state.quizs,
              {
                quizId:quizdata.quizId,
                subject:quizdata.subject,
                quizPhoto:quizdata.quizPhoto,
                quizTitle:quizdata.quizTitle,
                quizContents:quizdata.quizContents,
                quizAnswer:quizdata.quizAnswer,
                openStatus:quizdata.openStatus,
                quizTimeout:quizdata.quizTimeout,
                quizGrade:quizdata.quizGrade,
                userId:quizdata.userId,
                option1:quizdata.options[0],
                option2:quizdata.options[1],
                option3:quizdata.options[2],
                option4:quizdata.options[3],

                chatClass: 'quizs__item--visitor',
              },
            ],
            
          });
          // console.log(this.state.quizs)
          this.modalPop('quiz')
        });
        
        this.getToken().then((token) => {
          mySession
            .connect(
              token,
              // 여기가 데이터가 담기는 곳 !!!!
              { clientData: this.state.myUserName, 
                role:"student",
                studentId:this.state.student.studentId,
                weeklyStar: this.state.student.roomGrade,
                allStar : this.state.student.roomNum     // 이 두값 바꿔주기
              },
            )
            .then(() => {
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
             
              mySession.publish(publisher);
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
    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'ssafy' + (parseInt(this.state.student.roomGrade)*100 + parseInt(this.state.student.roomNum)),
      myUserName: this.state.student.studentName,
      mainStreamManager: undefined,
      publisher: undefined
    });
  }


  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;
    const quizs = this.state.quizs;
    const { path } = this.props.match
    // console.log('프랍프랍', path)
    return (
      <div className="ClassStudent">
        {/* 세션에 참가하기 전 */}
        {this.state.session === undefined && (
          <div className="join">
            <div className='student_login'>
              <div className='box'>
                <div className='left'>
                  <Image className='penguin' src="https://cdn.discordapp.com/attachments/885744368399560725/940498613614805022/be64e7a5abcb6882.png" />
                </div>
                <div className='right'> 
                  <div className='grade_room'>
                    
                    <form className="form-group" onSubmit={this.joinSession}>
                      <div>
                        <label className="label-control">이름 </label>
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
                        <label className="label-control"> 교실번호 </label>
                        <input
                          className="form-control"
                          type="text"
                          id="sessionId"
                          value={mySessionId}
                          onChange={this.handleChangeSessionId}
                          required
                          // disabled

                        />
                      </div>
                      <div className="btn_box">           
                          <Button colorScheme='linkedin' className="submit_button" type="submit" >들어가기</Button>
                      </div>
                    </form>
                    
                    
                  </div>
                </div>
              </div>
            </div>  
          </div>
        )}

        {/* 세션에 참가한 후 */}
        {this.state.session !== undefined && (
          <Box className='Conference_box'>
              <div className='left'>
                {/* 상단 학생 페이지  */}
                  <div className='student_box'>
                    {this.state.publisher !== undefined && (
                      <div>
                        <UserVideoComponent who="student" streamManager={this.state.publisher} />
                      </div>
                    )}
                    {this.state.subscribers.map((sub, i) => {
                      // console.log('*****************************************')
                      // console.log(JSON.parse(sub.stream.connection.data).role)
                      if (JSON.parse(sub.stream.connection.data).role === "student") {
                        return (
                          <div key={i}>
                            <UserVideoComponent who="student" streamManager={sub} />
                          </div>
                        )
                      }
                    } )}
                  </div>
                  <div className='teacher_button_box'>
                    {/* 선생님 화면 */}
                    <div className='teacher_box'>
                      {this.state.subscribers.map((sub, i) => {
                        // console.log('*****************************************')
                        // console.log(JSON.parse(sub.stream.connection.data).role)
                        if (JSON.parse(sub.stream.connection.data).role === "teacher") {
                          return (
                            <div key={i}>
                              <UserVideoComponent who="teacher" streamManager={sub} />
                            </div>
                          )
                        }
                      } )}
                    </div>
                    
                    {/* 버튼들 */}
                    <div className='center_button_box'>
                    
                    <StudentModal kind='sticker' iconAs={quizDino} title='스티커' />
                    <div className='state_button' >
                      {this.state.videostate ? (
                        <Toast setState={this.changeVideostate} iconAs={CamOff} title='Video Off'
                          change={false} message={'카메라를 껐습니다'} color={'white'} bg={'red.500'} />
                        ) : (
                        <Toast setState={this.changeVideostate} iconAs={CamOn} title='Video On'
                          change={true} message={'카메라를 켰습니다'} color={'white'} bg={'blue.500'} />
                      )}  
                    </div>
                    <div className='state_button'>
                      {this.state.audiostate ? (
                        <Toast setState={this.changeAudiostate} iconAs={micOff} title='Mic Off'
                          message={'마이크를 껐습니다'} color={'white'} bg={'orange.500'} />
                        ) : (
                        <Toast setState={this.changeAudiostate} iconAs={micOn} title='Mic On'
                          message={'마이크를 켰습니다'} color={'white'} bg={'blue.200'} />
                      )}
                    </div>
                  </div>
                </div>

              </div>
                <div className='right'>
                  <div className='right_up'>
                    <span className='grade_room'>{this.state.student.roomGrade}학년 {this.state.student.roomNum}반</span>
                    <Button className='exitButton' onClick={() => {
                      this.leaveSession()
                      this.handleHistory('/')
                      }}
                    >수업 떠나기</Button>
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
                        placeholder="채팅"
                        onChange={this.handleChatMessageChange}
                        onKeyPress={this.sendmessageByEnter}
                        value={this.state.message}
                      />
                  </div> 
                  {this.state.audiostate ? <div className='warning'>마이크가 켜져있어요</div>:<div  className='warning' />}
                <StudentModal setState={this.changeAudiostate} kind='announce' iconAs={micOn} title='발표하자' 
                  isOpen={this.props.isOpen} onOpen={this.props.onOpen} onClose={this.props.onClose} modalForm={this.props.modalForm} setModalForm={this.props.setModalForm} modalOpen={this.props.modalOpen}/>
                <StudentModal kind='quiz' quizs = {quizs} resultQ = {this.sendresultHandle} iconAs={micOn} title='퀴즈'
                  isOpen={this.props.isOpen} onOpen={this.props.onOpen} onClose={this.props.onClose} modalForm={this.props.modalForm} setModalForm={this.props.setModalForm} modalOpen={this.props.modalOpen}/>
                <StudentModal kind='oxQuiz' quizs = {quizs} resultQ = {this.sendresultHandle} iconAs={micOn} title='OX퀴즈' 
                  isOpen={this.props.isOpen} onOpen={this.props.onOpen} onClose={this.props.onClose} modalForm={this.props.modalForm} setModalForm={this.props.setModalForm} modalOpen={this.props.modalOpen}/>
                </div>
          </Box>
        )}
      </div>
    );
  }

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

export default withRouter(StudentRoom);

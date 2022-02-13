/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component,createRef } from 'react';
import { Button, Box, Input } from '@chakra-ui/react';
import "./scss/ClassTeacher.scss"
import TeacherModal from './components/TeacherModal';
import { withRouter } from 'react-router-dom';
import Toast from './components/Toast';
import UserVideoComponent from './openVidu/UserVideoComponent';
import Messages from './components/Messages';
import StudentScreen from './components/StudentScreen'
import {serverUrl, setToken } from '../../components/TOKEN';

const OPENVIDU_SERVER_URL = 'https://i6e107.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'ssafy';

class Classroom extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem('user'))
    this.state = {
      // OV
      speakingStudents: [],
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
      screenShareState: false,
      highlighting: false,
      answerCheck: false,
      user: user,
      rollingStudent: undefined,
      //quiz
      quizs:{},
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

      //quizstudent
      results:[],
      studentId:'',
      studentResult:'',
      pickone:"랜덤뽑기",

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
    this.changeHighlightingstate = this.changeHighlightingstate.bind(this)
    this.changeAnswerCheckstate = this.changeAnswerCheckstate.bind(this)
    this.announceHandler = this.announceHandler.bind(this)
    this.plusStarHandler = this.plusStarHandler.bind(this)
    this.resultsHandler = this.resultsHandler.bind(this)
    this.changeOnScreenShareState = this.changeOnScreenShareState.bind(this)
    this.changeOffScreenShareState = this.changeOffScreenShareState.bind(this)
    // quiz
    this.quizHandler = this.quizHandler.bind(this);
    this.quizHandlerStar = this.quizHandlerStar.bind(this);
    this.getAverage = this.getAverage.bind(this);
    this.doRolling = this.doRolling.bind(this)
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
  }


  // TM
  screenShare() {
    const videoSource =
      navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
    this.OV = new OpenVidu();
    // publisher 정보 담기
    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: this.state.audiostate,
        publishVideo: true,
        mirror: false,
      },
      error => {
        if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
          this.setState({ showExtensionDialog: true });
        } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
          alert('Your browser does not support screen sharing');
        } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
          alert('You need to enable screen sharing extension');
        } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
          alert('You need to choose a window or application to share');
        }
      }
    );

    publisher.once('accessAllowed', () => {
      this.state.session.unpublish(this.state.mainStreamManager); // 송출하고 있는거 중단 (안하면 에러)
      this.state.session.publish(publisher).then(() => {
        // 송출하기

        // this.props.doMainStreamManagerInfo(publisher); // 스타 publisher 정보 바꾸기
        // state 변경
        this.setState({
          screenShareState: true,
          mainStreamManager:publisher
        });
      });
    });
  }
  stopScreenShare() {
    this.state.session.unpublish(this.state.mainStreamManager); // 화면 공유 중지
    this.OV = new OpenVidu();
    // publisher 설정
    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined, // The source of audio. If undefined default microphone
      videoSource: undefined, // The source of video. If undefined default webcam
      publishAudio: this.state.audiostate, // Whether you want to start publishing with your audio unmuted or not
      publishVideo: true, // Whether you want to start publishing with your video enabled or not
      resolution: '640x480', // The resolution of your video
      frameRate: 30, // The frame rate of your video
      insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
      mirror: false, // Whether to mirror your local video or not
    });

    this.state.session.publish(publisher); // 캠 송출하기
    // this.props.doMainStreamManagerInfo(publisher); // 스타 publisher 정보 바꾸기
    this.setState({
      audioState: false,
      videoState: true,
      screenShareState: false,
      mainStreamManager:publisher

    });
  }


  resultsHandler() {
    const newResults = this.state.results.filter(result => result.studentResult)
    // console.log(newResults)
    this.setState({
      results: newResults,
      answerCheck: true
    })
    console.log('newResults:', this.state.results)
    axios({
      url: `${serverUrl}/student/student`,
      method: 'POST',
      headers: setToken(),
      data: newResults
    })
    .then(res => console.log(res))
    .catch(err => console.log('quiz log err', err))
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
  
  getAverage(){
    console.log('⭐⭐⭐⭐계산중입니다⭐⭐⭐⭐')
    let total = 0
    // eslint-disable-next-line no-lone-blocks
    {this.state.subscribers.map((sub) => (
      total = total + Number(JSON.parse(sub.stream.connection.data).countingStar)
    ))}
    total = total/(this.state.subscribers).length
    this.setState({
      total:total
    })
  }

  changeHighlightingstate() {
    this.setState({
      highlighting: !this.state.highlighting,
    })
  }
  
  changeAnswerCheckstate() {
    this.setState({
      answerCheck: !this.state.answerCheck
    })
  }
  
  changeOnScreenShareState(){
    this.screenShare();
    this.setState({
      screenShareState: true,
    });
  }
  changeOffScreenShareState(){
    this.stopScreenShare();
    this.setState({
      screenShareState: false,
    });
  }

  handleHistory(path) {
    this.props.history.push(path)
  }

  

  // OV
  componentDidUpdate(previousProps, previousState) {
    if (this.refs.chatoutput != null) {
      this.refs.chatoutput.scrollTop = this.refs.chatoutput.scrollHeight;
    }
    this.props.setHeader(true)
  } 
  componentDidMount() {
    this.setState({ user : JSON.parse(localStorage.getItem('user'))})
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
  doRolling(){
    const mySession = this.state.session;
    const pickone = Math.floor(Math.random()*this.state.subscribers.length) 
    console.log("⭐랜덤함수:",JSON.parse(this.state.subscribers[pickone].stream.connection.data).clientData)
    this.setState({
      pickone:JSON.parse(this.state.subscribers[pickone].stream.connection.data).clientData
    })
    mySession.signal({
      data: JSON.parse(this.state.subscribers[pickone].stream.connection.data).clientData,
      to: [],
      type: 'rolling',
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

  // 발표시키기
  announceHandler(i){
    const mySession = this.state.session;
    mySession.signal({
      to: [this.state.subscribers[i].stream.inboundStreamOpts.connection],
      type: 'announcement',
    });
  }

  // 별점 주기
  plusStarHandler(i){
    const mySession = this.state.session;
    mySession.signal({
      to: [this.state.subscribers[i].stream.inboundStreamOpts.connection],
      type: 'star',
    })
  }

  quizHandler(){
    let qox = sessionStorage.getItem('OXQuiz')
    // console.log('getItem??', qox)
    let qox1 = JSON.parse(qox);
      this.setState({
      quizs: 
        {
          quizTimeout: qox1.quizTimeout,
          quizId: qox1.quizId,
          quizContents: qox1.quizContents,
          quizAnswer: qox1.quizAnswer,
          chatClass: 'quizs__item--operator',
        },
      });
      const mySession = this.state.session;

    mySession.signal({
      data: JSON.stringify(qox1),
      to: [],
      type: 'quiz',
    });

    this.setState({
      quizContents: '',
      quizAnswer: '',
      results:[],
    });
    sessionStorage.removeItem('OXQuiz');
  }

  //북마크 용
  quizHandlerStar(){
    let qq = sessionStorage.getItem('bookmarkQuiz')
    // console.log('getItem??', qq)
    let q1 = JSON.parse(qq);
    // console.log(q1)
      this.setState({
        quizs: 
          {
            quizId: q1.quizId,
            subject: q1.subject,
            quizPhoto: q1.quizPhoto,
            quizTitle: q1.quizTitle,
            quizContents: q1.quizContents,
            quizAnswer: q1.quizAnswer,
            openStatus: q1.openStatus,
            quizTimeout: q1.quizTimeout,
            quizGrade: q1.quizGrade,
            userId: q1.userId,
            option1 : q1.options[0],
            option2 : q1.options[1],
            option3 : q1.options[2],
            option4 : q1.options[3],
            results:[],
            chatClass: 'bookmarkQuiz__item--operator',
          },
        });
        const mySession = this.state.session;
    
      mySession.signal({
        data: JSON.stringify(q1),
        to: [],
        type: 'bookmarkQuiz',
      });
    
      this.setState({
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
        results:[]
        // studentId:'',
        // studentAnswer:'',
      });
      sessionStorage.removeItem('bookmarkQuiz');
  }

  saveStudentQuizLog(data){
    console.log(data)
    axios(
        {
          url : `${serverUrl}/student/student/`,
          method: "POST",
          data,
          headers : setToken()
        }
      ).then(res=>{
        console.log(res)
      }).catch(err=>{
        alert("학생 로그 UPDATE 에러")
      })
  }



  joinSession() {
    // --- 1) Get an OpenVidu object ---
    this.OV = new OpenVidu();

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
        mySession.on('streamDestroyed', (event) => {
          this.deleteSubscriber(event.stream.streamManager);
        });
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

        mySession.on('publisherStartSpeaking', (event) => {
          const whoSpeaking = JSON.parse(event.connection.data).studentId
          
          this.state.subscribers.map((sub,i)=>{
            if(whoSpeaking=== JSON.parse(sub.stream.connection.data).studentId){     
              this.setState({
                speakingStudents: [...this.state.speakingStudents,whoSpeaking],
              })
              console.log("⭐newspeakingStudents",this.state.speakingStudents)
            }
          })

        });

        mySession.on('publisherStopSpeaking', (event) => {
          const whoSpeaking = JSON.parse(event.connection.data).studentId
          this.state.subscribers.map((sub,i)=>{
            if(whoSpeaking=== JSON.parse(sub.stream.connection.data).studentId){     
              this.setState({
                speakingStudents:this.state.speakingStudents.filter(stu=>stu!==whoSpeaking),
              })
              console.log('⭐⭐',this.state.speakingStudents)
            }
          })
      });
        
        mySession.on('signal:receiveStar',(event)=>{
          let student = JSON.parse(event.data)
          console.log('⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐')
          console.log(student.studentId)
          console.log(JSON.parse(this.state.subscribers[0].stream.connection.data).studentId)
          this.state.subscribers.map((sub,i)=>{
            if(student.studentId === JSON.parse(sub.stream.connection.data).studentId){
              let tmp = JSON.parse(sub.stream.connection.data)
              tmp = JSON.stringify({...tmp,countingStar:tmp.countingStar+1,studentScore:tmp.studentScore+1 } )
              let newsubscribers = this.state.subscribers
              newsubscribers[i].stream.connection.data = tmp
              this.setState({
                subscribers: newsubscribers
              })
            }
          })
          this.getAverage()
          console.log(this.state.subscribers)
        })
        //quiz 학생 결과 가지기 용
        mySession.on('signal:studentQuizresult', (event) => {
          let resultsdata = JSON.parse(event.data);
          this.setState({
            results: [
              ...this.state.results,
              {
                studentAnswer: resultsdata.studentAnswer,
                studentId:resultsdata.studentId,
                quizId:resultsdata.quizId,
                studentResult:resultsdata.studentResult,
              },
            ],
          });
          if ((2*this.state.subscribers.length === this.state.results.length) && (this.state.results.length!==0 )) {
            this.resultsHandler()
          }
        });



        this.getToken().then((token) => {
          mySession
            .connect(
              token,
              { clientData: this.state.myUserName, 
                role:"teacher",
                studentId: this.state.userId },
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
      mySessionId: this.state.mySessionId,
      myUserName: this.state.myUserName,
      mainStreamManager: undefined,
      publisher: undefined
    });
  }


  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = JSON.parse(localStorage.getItem('user')).userName;

    return (
      <div className="ClassTeacher">
        {/* 세션에 참가하기 전 */}
        {this.state.session === undefined && (
          <div className="login_box"> 
              <form className="form-group" onSubmit={this.joinSession}>
                <img className="teacher_img" src={this.props.user.userProfile} alt="선생님사진"/>
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
                    <StudentScreen speakingStudents={this.state.speakingStudents}  answerCheck={this.state.answerCheck} results={this.state.results} 
                    highlighting={this.state.highlighting} total={this.state.total} getAverage={this.getAverage}  streamManager={sub} 
                    i={i} announce={this.announceHandler} plusStar={this.plusStarHandler} />
                  </div>
                ))}
                
                
                {this.state.mainStreamManager !== undefined && (
                  <div>
                    <UserVideoComponent score="teacherScore" streamManager={this.state.mainStreamManager} />
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
              <Button onClick={()=>{this.doRolling()}}>{this.state.pickone}</Button>
                <TeacherModal kind='ox' quizQ = {this.quizHandler} imgSrc='https://i.ibb.co/fDyyfz0/answer.png' title='OX 퀴즈' />
                <TeacherModal kind='bookmark' quizQ = {this.quizHandlerStar} imgSrc='https://i.ibb.co/cg8bVJZ/laptop.png' title='즐겨찾기 퀴즈' />
                {this.state.videostate ? (
                  <Toast setState={this.changeVideostate} imgSrc='https://i.ibb.co/XD4nJG0/video-player.png' title='Video Off'
                    change={false} message={'카메라를 껐습니다'} color={'white'} bg={'red.300'} />
                  ) : (
                  <Toast setState={this.changeVideostate} imgSrc='https://cdn-icons-png.flaticon.com/512/3557/3557161.png' title='Video On'
                    change={true} message={'카메라를 켰습니다'} color={'white'} bg={'blue.300'} />
                )}  
                {this.state.audiostate ? (
                  <Toast setState={this.changeAudiostate} imgSrc='https://cdn-icons-png.flaticon.com/512/2972/2972122.png' title='Mic Off'
                    message={'마이크를 껐습니다'} color={'white'} bg={'orange.300'} />
                  ) : (
                  <Toast setState={this.changeAudiostate} imgSrc='https://i.ibb.co/Cmw64C6/mute.png' title='Mic On'
                    message={'마이크를 켰습니다'} color={'white'} bg={'green.300'} />
                )}
                {this.state.highlighting ? (
                  <Toast setState={this.changeHighlightingstate} imgSrc='https://i.ibb.co/NNd1Vpx/highlighter.png' title='하이라이팅 끄기'
                    change={false} message={'하이라이팅을 껐습니다'} color={'black'} bg={'red.100'} />
                    ) : (
                  <Toast setState={this.changeHighlightingstate} imgSrc='https://i.ibb.co/pdJQQ89/highlighter-1.png' title='하이라이팅 켜기'
                    change={true} message={'하이라이팅을 켰습니다'} color={'black'} bg={'blue.100'} />
                )}
                
                {this.state.answerCheck ? (
                  <Toast setState={this.changeAnswerCheckstate} imgSrc='https://cdn-icons-png.flaticon.com/512/3208/3208770.png' title='퀴즈결과 끄기'
                    change={false} message={'퀴즈결과 끄기'} color={'black'} bg={'orange.100'} />
                    ) : (
                  <Toast setState={this.changeAnswerCheckstate} imgSrc='https://cdn-icons-png.flaticon.com/512/3208/3208648.png' title='퀴즈결과 보기'
                    change={true} message={'퀴즈결과 보기'} color={'black'} bg={'green.100'} />
                )}
                {this.state.screenShareState ? (
                  <Toast setState={this.changeOffScreenShareState} imgSrc='https://cdn.discordapp.com/attachments/885744368399560725/942115654251720724/share.png' title='화면공유 끄기'
                    change={false} message={'화면공유 끄기'} color={'black'} bg={'orange.100'} />
                    ) : (
                  <Toast setState={this.changeOnScreenShareState} imgSrc='https://cdn.discordapp.com/attachments/885744368399560725/942115858157830204/monitor.png' title='화면공유'
                    change={true} message={'화면공유'} color={'black'} bg={'green.100'} />
                )}
                <div>
                  <p>{this.state.subscribers.length}</p>
                  <p>{this.state.results.length}</p>
                  {/* 학생의 결과값이 세션에 있는 학생수 와 동일합니다.? (axios):null */
                    (this.state.subscribers.length === this.state.results.length) && (this.state.results.length!==0 ) && (this.state.results[0].quizId !== "1004") ?
                    this.saveStudentQuizLog(this.state.results)
                    : null
                  }
                </div>

              </div>
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

export default withRouter(Classroom);

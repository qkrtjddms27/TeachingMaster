import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }
    render() {
        let TeacherORstudent = ""
        if (this.props.score==="teacherScore"){ TeacherORstudent= "teacherName" }
        else{ TeacherORstudent ="studentName"}
        let speaking = ""
        if (this.props.speaking) {speaking ="speaking"}
        else{speaking=null}
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent score={this.props.score} streamManager={this.props.streamManager} /> 
                        <div className={`${TeacherORstudent} ${speaking}` } id={this.props.check ? 'correct': 'wrong'}>
                            <p>{this.getNicknameTag()} {this.props.score==="teacherScore"&& "선생님"}</p> 
                            {this.props.answerCheck && (this.props.check ? 
                            <img alt="o" src="https://cdn.discordapp.com/attachments/885744368399560725/941684339744325635/circumference.png"/> : 
                            <img alt="x" src="https://cdn.discordapp.com/attachments/885744368399560725/941685504154402867/close.png"/>)
                            }
                            {/* <p>{this.getNicknameTag()} {this.props.score==="teacherScore"&& "선생님"} {this.props.answerCheck && (this.props.check ? '🔵' : '❌')}</p> */}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

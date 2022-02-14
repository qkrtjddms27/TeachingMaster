import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }
    render() {
        let TeacherORstudent = ""
        if (this.props.score==="teacherScore"){ TeacherORstudent= "teacherName" }
        else{ TeacherORstudent ="studentName"}
        
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent isSpeaking={this.props.isSpeaking}  score={this.props.score} streamManager={this.props.streamManager} /> 
                        <div className={TeacherORstudent} id={`${this.props.check ? 'correct': 'wrong'}`,
                        `${this.props.isSpeaking ? "isSpeakingname":""}`}>
                            <p>{this.getNicknameTag()} {this.props.score==="teacherScore"&& "선생님"}</p> 
                            {this.props.answerCheck && (this.props.check ? 
                            <img alt="o" src="https://cdn.discordapp.com/attachments/885744368399560725/941684339744325635/circumference.png"/> : 
                            <img alt="x" src="https://cdn.discordapp.com/attachments/885744368399560725/941685504154402867/close.png"/>)
                            }
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

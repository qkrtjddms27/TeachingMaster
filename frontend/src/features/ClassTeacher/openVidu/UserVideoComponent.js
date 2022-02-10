import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent score={this.props.score} streamManager={this.props.streamManager} /> 
                        <div className={this.props.score==="teacherScore"?"teacherName":"studentName"} id={this.props.check ? 'correct': 'wrong'}>
                            <p>{this.getNicknameTag()} {this.props.score==="teacherScore"&& "선생님"} {this.props.answerCheck && (this.props.check ? '⭕' : '❌')}</p>
                            {/* <p>{this.getNicknameTag()} {this.props.score==="teacherScore"&& "선생님"} {this.props.answerCheck && (this.props.check ? '🔵' : '❌')}</p> */}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

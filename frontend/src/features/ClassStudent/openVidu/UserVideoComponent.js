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
                    <div id={this.props.who}>
                        <OpenViduVideoComponent 
                        who = {this.props.who}
                        streamManager={this.props.streamManager} /> 
                        <div><p>{this.getNicknameTag()}
                        <span style={{marginLeft:"0.5rem"}}>{this.props.who==="teacher"&&`선생님`}</span>
                        </p></div>
                    </div>
                ) : null}
            </div>
        );
    }
}

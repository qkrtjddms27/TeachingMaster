/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';


class Message extends Component {
  render() {
    const { text, userName } = this.props;

    return (
      <div className='chat_line'>
        <span className='chat_name'>{userName}</span><br/>
        <span className='chat_content'>{text}</span>
      </div>
    );
  }
}

export default Message;

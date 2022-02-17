/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import Message from './Message';


class Messages extends Component {
  render() {
    const { messages } = this.props;

    return messages.map((message, i) => (
      <div className='text' key={i}>
        <Message text={message.text} userName={message.userName} role={message.role} />
      </div>
    ));
  }
}

export default Messages;

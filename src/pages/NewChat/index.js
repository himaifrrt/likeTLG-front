import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

export const NewChat = ({ interlocutor, userId }) => {
  const [message, getMessage] = useState('');

  const handleSendMessage = () => {
    if (!message) return;
    axios.post('http://localhost:5000/api/v1/chat/send-message', {
      user: userId,
      interlocutor: interlocutor.id,
      message
    })
  }

  return (
    <div>
      {interlocutor.id ? null : <Redirect to='/my-chats' />}
      <header>
        <span>{interlocutor.first_name} {interlocutor.last_name}</span>
      </header>
      <div style={{ height: 'calc(100vh - 57px)' }}></div>
      <footer style={{ display: 'flex' }}>
        <input style={{ height: 30, width: '100%', margin: 0 }} value={message} onChange={({ currentTarget }) => getMessage(currentTarget.value)} />
        <button onClick={handleSendMessage}>Send</button>
      </footer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  interlocutor: state.chat.interlocutor
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, null)(NewChat)

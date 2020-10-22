import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import { setInterlocutor } from '../../actions/chat'

export const MyChats = ({ setInterlocutor }) => {
  const history = useHistory();
  const [value, setValue] = useState('aaa@ddd.com');
  const [user, setUser] = useState({});

  const handleFind = () => {
    if (value) {
      axios.post('http://localhost:5000/api/v1/users/email', { email: value })
        .then(res => {
          setUser({ ...res.data.data });
        })
        .catch(err => {
          toast.error(err.response.data.error)
        });
    } else toast.error('Fill in field')
  }

  const selectInterlocutor = () => {
    setInterlocutor(user);
    history.replace('/new-chat');
  }

  return (
    <div className='MyChats'>
      <div>
        <input onChange={({ currentTarget }) => setValue(currentTarget.value)} value={value} />
        <button onClick={handleFind}>Find</button>
      </div>
      <div className='finded-user'>
        {user.id ? (
          <div onClick={selectInterlocutor}>
            <span>{user.first_name}</span>
            <span>{user.last_name}</span>
          </div>
        ) : null}
      </div>
      <div className='chat-list'></div>
      <ToastContainer />
    </div>
  )
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  setInterlocutor: (fullName) => dispatch(setInterlocutor(fullName))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyChats);

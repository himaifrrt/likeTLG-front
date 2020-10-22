import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import axios from 'axios';

import { init } from '../../actions/user';

import '../../styles/Authentication.scss';

const Authentication = ({ init, token }) => {
  const [isSignin, setIsSignin] = useState(false);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    if (email, firstName, lastName, password) {
      let userCreds = {
        email,
        first_name: firstName,
        last_name: lastName,
        password
      };
      if (isSignin) {
        delete userCreds.first_name;
        delete userCreds.first_name;
      }
      axios.post(`http://localhost:5000/api/v1/auth/sign${isSignin ? 'in' : 'up'}`, userCreds)
      .then(({ data }) => {
        let user = {
          email: data.data.email,
          password: data.data,
          firstName: data.data.first_name,
          lastName: data.data.last_name,
          token: data.data.token,
        }
        init(user);
      })
      .catch(err => {
        toast.error(err.response.data.error)
      });
    } else toast.error('fill in the fields');
  };

  const inputsArray = [
    { id: 'email', value: email, label: 'Email', func: setEmail },
    { id: 'firstName', value: firstName, label: 'First Name', func: setFirstName },
    { id: 'lastName', value: lastName, label: 'Last Name', func: setLastName },
    { id: 'password', value: password, label: 'Password', func: setPassword },
  ];

  return (
    <div className='auth-page'>
      {token ? <Redirect to='/my-chats' /> : null}
      {inputsArray.map((i, idx) => {
        if (isSignin && (i.id === 'firstName' || i.id === 'lastName')) return;
        return(
        <React.Fragment key={`${idx}`}>
          <label htmlFor={i.id}>{i.label}</label>
          <input id={i.id} onChange={(e) => i.func(e.currentTarget.value)} value={i.value} />
        </React.Fragment>
      )})
      }
      <div>
        <button onClick={handleAuth}>Auth</button>
        <div className='separator' />
        <button onClick={() => setIsSignin(!isSignin)}>{isSignin ? 'Sign up' : 'Sign in' }</button>
      </div>
      <ToastContainer />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  init: (obj) => dispatch(init(obj)),
})

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from 'react-redux';
import Authentication from './pages/Authentication';
import MyChats from './pages/MyChats';
import NewChat from './pages/NewChat';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ token }) => {
  return (
    <Router>
        <Switch>
          <Route path="/authentication" exact component={Authentication} />
          <Route path="/my-chats" component={MyChats} />
          <Route path="/new-chat" component={NewChat} />
          {token ? <Redirect to='/my-chats' /> : <Redirect to='/authentication' />}
        </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  }
}

export default connect(mapStateToProps, null)(App);

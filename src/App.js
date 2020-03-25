import React, { Component } from 'react';
import Profile from './Profile.js';
import Signin from './Signin.js';
import TopBar from './TopBar.js'
import SigninCover from './SigninCover.js';
import ChatRoomBase from './ChatRoomBase.js';
import {
  UserSession,
  AppConfig
} from 'blockstack';

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

export default class App extends Component {


  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    return (
      <div>
        <TopBar userSession={userSession} handleSignIn={ this.handleSignIn } handleSignOut={ this.handleSignOut }/>
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            { !userSession.isUserSignedIn() ?
              <SigninCover userSession={userSession} />
              : <ChatRoomBase userSession={userSession} />
            }
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ userData: userData})
      });
    }
  }
}

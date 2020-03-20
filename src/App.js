import React, { Component } from 'react';
import Profile from './Profile.js';
import Signin from './Signin.js';
import Nav from './nav.js';
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

  renderNav(){
    return(
    <Nav
      userSession={userSession}
    />)
  }

  render() {
    return (
      <div>
        <div>{this.renderNav()}</div>
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            { !userSession.isUserSignedIn() ?
              <Signin userSession={userSession} handleSignIn={ this.handleSignIn } />
              : <Profile userSession={userSession} handleSignOut={ this.handleSignOut } />
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

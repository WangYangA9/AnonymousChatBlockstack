import React, { Component } from 'react';
import Profile from './Profile.js';
import Signin from './Signin.js';
import TopBar from './TopBar.js'
import SigninCover from './SigninCover.js';
import Message from './Message.js'
import Grid from '@material-ui/core/Grid';
import {
  UserSession,
  AppConfig
} from 'blockstack';

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

export default class ChatRoom extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
      messageList:{},
  	};

  }

  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  displayMessage(){

  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TopBar userSession={userSession} handleSignIn={ this.handleSignIn } handleSignOut={ this.handleSignOut }/>
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            { !userSession.isUserSignedIn() ?
              <SigninCover userSession={userSession} />
              : <Grid container className="ChartRoom" justify="center" >
                  <Message userSession={userSession} handleSignOut={ this.handleSignOut } messageList={this.displayMessage}/>
                </Grid>
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

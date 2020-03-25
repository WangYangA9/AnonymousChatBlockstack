import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class SigninCover extends Component {
  constructor(props) {
  	super(props);
  }
  render() {
    const { handleSignIn } = this.props; 

    return (
      <div >
        <h1>Welcome To The Anonymous Chat</h1>
        <h2>Please Sign In</h2>
      </div>
    );
  }
}

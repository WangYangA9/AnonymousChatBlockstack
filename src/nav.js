import React from 'react';
import {
  Person,
} from 'blockstack';
function Account(props) {
    return (
        <div 
          className="account" 
          // onClick={() => props.onClick()}
        >
          {props.value}
        </div>
      );
}

export default class Nav extends React.Component {
  render (){
    const { userSession } = this.props;
    const person = userSession.isUserSignedIn() ? new Person(userSession.loadUserData().profile) : undefined
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-static-top">
          <a className="navbar-brand" href="https://blockstack.org">
            <img src="white-logo.svg" alt=""/>
          </a>
          <div className="app_name">Anonymous Chat</div>
          { userSession.isUserSignedIn()?
            <Account 
              value={person.name()}
            />
            : <div className="account">请登录</div>
          }
        </nav>
        <noscript>
          You need to enable JavaScript to run this Blockstack app.
        </noscript>
      </div>
    );
  }
}
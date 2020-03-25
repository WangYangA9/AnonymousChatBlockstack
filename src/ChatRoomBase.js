import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import App from './App.js';
import ChatRoom from './ChatRoom.js'

export default class ChatRoomBase extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
          person: {
              name() {
            return 'Anonymous';
          },
              avatarUrl() {
                return 'Anonymous';
              },
          },
        };
    }
    createRoom() {
        ReactDOM.render(<BrowserRouter><ChatRoom/></BrowserRouter>, document.getElementById('root'));
    }
    render() {
        const { handleSignOut, userSession } = this.props;
        return (
            <div>
                <Button 
                    className="create_meeting" 
                    variant="contained" 
                    color="primary"
                    onClick={this.createRoom}
                >
                    Create  Meeting
                </Button>
                <Button 
                    className="join_meeting" 
                    variant="contained" 
                    color="primary"
                    disabled
                >
                    Join  Meeting
                </Button>
            </div>
        )
    }
}
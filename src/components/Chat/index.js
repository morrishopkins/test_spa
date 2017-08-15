import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { bindActionCreators } from 'redux';
import { darkBlack } from 'material-ui/styles/colors';

import * as actionCreators from '../../actions/chat';
import {
    UBER_USERNAME,
    OPENTABLE_USERNAME,
    BOTLIST,
} from '../../constants/index';

function mapStateToProps(state) {
  console.log(state);
  return {
    token: state.auth.token,
    username: state.auth.username,
    isParty: state.chat.isParty,
    receiver: state.chat.receiver,
    avatar: state.auth.avatar,
    isAuthenticated: state.auth.isAuthenticated,
    party_name: state.chat.party_name,
    party_id: state.chat.party_id,
    messages: state.chat.messages,
    allMessages: state.chat.allMessages,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const style = {
  height: '95%',
	overflow: 'hidden',
};

@connect(mapStateToProps, mapDispatchToProps)
export class Chat extends Component {

  componentWillMount() {
    this.props.setChatWindow(this.props.party_name);
    this.props.setNewListener(this.props.party_name, true, null);
  }

  componentDidMount() {
      document.getElementById('chatinput').placeholder = 'Chat Message';
  }

  getMessage() {
    const msg = document.getElementById('chatinput').value;
    return msg;
  }

  sendMessage(msg) {
    if (msg.length > 0) {
      if (this.props.isParty) {
        this.props.send_party_chat(msg, this.props.party_name.replace(' ', ''), this.props.party_id, this.props.username);
      } else {
        this.props.send_chat(msg, this.props.party_name.replace(' ', ''), this.props.receiver, this.props.username);
      }
    }
    document.getElementById('chatinput').value = '';
    document.getElementById('chatinput').placeholder = '';
    if (OPENTABLE_USERNAME === this.props.receiver) {
      document.getElementById('chatinput').placeholder = 'Restaurant Name@YYYY-MM-DD 24:00 || Partysize';
    } else if (UBER_USERNAME === this.props.receiver) {
      document.getElementById('chatinput').placeholder = 'Destination Address';
    } else {
      document.getElementById('chatinput').placeholder = 'Chat Message';
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const message = this.getMessage();
      this.sendMessage(message);
    }
  }

  render() {
    return (
            <div className="col-md-8 col-md-offset-2" onKeyPress={(e) => this.handleKeyPress(e)}>
							<Paper style={style} zDepth={5} rounded={false} >
                <Subheader>{this.props.party_name}</Subheader>
                <Divider />
                <List id="messagelist" style={{ zIndex: '1', height: '85%', width: '98%', left: '1%', position: 'relative', overflow: 'scroll' }} >
                {this.props.messages.map((msg) => <ListItem
                  leftAvatar={(msg.username === this.props.username) ? null : <Avatar src={msg.avatar} />}
                  rightAvatar={(msg.username === this.props.username) ? <Avatar src={msg.avatar} /> : null}
                  secondaryText={
                          <h5>
                            <span style={{ fontSize: '10pt', color: darkBlack }}>{msg.time} </span>--
                            {msg.username}
                          </h5>
                        }
                  primaryText={
                        (BOTLIST.includes(msg.username))
                          ? <pre> {msg.text} </pre>
                          : <p> {msg.text} </p>
                       }
                  secondaryTextLines={1}
                  style={(msg.username === 'Me') ? { textAlign: 'right' } : {}}
                />
                  )}
                </List>

								<TextField
  id="chatinput"
  style={{ width: '98%', left: '1%', position: 'relative', backgroundColor: 'white', bottom: '5px', zIndex: '2' }}
								/>
							</Paper>
						</div>
        );
  }

}

Chat.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
  isParty: React.PropTypes.bool,
  party_id: React.PropTypes.number,
  party_name: React.PropTypes.string,
  username: React.PropTypes.string,
  receiver: React.PropTypes.string,
  send_chat: React.PropTypes.func,
  send_party_chat: React.PropTypes.func,
  setChatWindow: React.PropTypes.func,
  setNewListener: React.PropTypes.func,
  addMessage: React.PropTypes.func,
  isAuthenticated: React.PropTypes.bool,
};

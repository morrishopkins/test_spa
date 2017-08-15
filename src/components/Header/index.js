import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import LeftNav from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import People from 'material-ui/svg-icons/social/people';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Divider from 'material-ui/Divider';
import { grey500 } from 'material-ui/styles/colors';

import * as actionCreators from '../../actions/auth';
import * as chatActionCreators from '../../actions/chat';
import {
    UBER_USERNAME,
    OPENTABLE_USERNAME,
} from '../../constants/index';


function mapStateToProps(state) {
  return {
    party_name: state.chat.party_name,
    username: state.auth.username,
    user_id: state.auth.user_id,
    friendlist: state.chat.friendlist,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, chatActionCreators, actionCreators), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
			selectedIndex: 0,
      open: false,
    };
    this.btnStyle = {
      margin: 12,
			width: '20px',
    };

		this.select = (index) => {
      console.log('inside of the select function');
      this.setState({ selectedIndex: index });
      this.props.callUber('201 W 109th St, New York, NY10025');
      console.log('done calling uber');
      this.props.callOpenTable('261196', '2', '2016-11-27 18:30');
      console.log('done calling opentable');
    };
  }
  componentWillMount() {
    this.props.getFriendList(this.props.username);
    this.props.setGeoListener(this.props.username);
  }

  onFriendSelected(friend) {
    let party_name;
    if (this.props.user_id <= friend.user_id) {
      party_name = `${this.props.username.replace(' ', '')}-${friend.username.replace(' ', '')}`;
    } else {
      party_name = `${friend.username.replace(' ', '')}-${this.props.username.replace(' ', '')}`;
    }
    this.props.getFriendHistory(friend.username, party_name);
    this.props.setChatWindow(party_name);
    console.log('about to set new listener for ' + party_name);
    this.props.setNewListener(party_name, false, friend.username);
    this.props.setGeoListener(this.props.username);

    document.getElementById('chatinput').placeholder = '';
    if (OPENTABLE_USERNAME === friend.username) {
      document.getElementById('chatinput').placeholder = 'Restaurant Name@YYYY-MM-DD 24:00 || Partysize';
    } else if (UBER_USERNAME === friend.username) {
      document.getElementById('chatinput').placeholder = 'Destination Address';
    } else {
      document.getElementById('chatinput').placeholder = 'Chat Message';
    }
  }

  logout(e) {
    e.preventDefault();
    this.props.logoutAndRedirect();
  }


  dispatchNewRoute(route) {
    browserHistory.push(route);
  }


  addFriendClicked() {
    this.setState({ open: true });
  }

  addFriend() {
    const email = document.getElementById('addfriendtextbox').value;
    document.getElementById('addfriendtextbox').value = '';
    this.props.addFriend(email, this.props.username);
    this.handleClose();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onTouchTap={this.addFriend.bind(this)}
      />,
    ];
    return (
        <div>
            <header>
              <LeftNav open>
                <div>
                  <AppBar
                    title={
                       <span style={{ fontSize: '30px', letterSpacing: '3px' }}>PARTY.io</span>
                    }
                    iconElementLeft={<div />}
                  />
                  <MenuItem onClick={() => this.dispatchNewRoute('/profile')}> Profile </MenuItem>
                  <MenuItem onClick={(e) => this.logout(e)}> Logout </MenuItem>
                  <Divider />
                  <List>
									<Subheader>Friends({this.props.friendlist.length}) {<PersonAdd color={grey500} style={{ margin: '15px', float: 'right' }} onTouchTap={this.addFriendClicked.bind(this)} />}</Subheader>
									{this.props.friendlist.map((friend) => <ListItem
  primaryText={friend.username}
  leftAvatar={<Avatar src={friend.avatar} />}
  rightIcon={<CommunicationChatBubble />}
  onTouchTap={this.onFriendSelected.bind(this, friend)}
         />
                  )}
									</List>
                  <BottomNavigation
                    selectedIndex={this.state.selectedIndex}
                    style={{ position: 'absolute', bottom: '2px' }}
                  >
                  <BottomNavigationItem
                    label="Friends"
                    icon={<People />}
                    onTouchTap={() => this.select(0)}
                  />
									</BottomNavigation>
               </div>
              </LeftNav>
            </header>
            <div>
              <Dialog
                title="Add a friend"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
                Type in the friends email address and press enter.
                <br />
                <TextField
                  hintText="friends email"
                  id="addfriendtextbox"
                />
              </Dialog>
            </div>
            </div>
        );
  }
}

Header.propTypes = {
  user_id: React.PropTypes.number,
  username: React.PropTypes.string,
  friendlist: React.PropTypes.arrayOf(React.PropTypes.object),
  logoutAndRedirect: React.PropTypes.func,
  callUber: React.PropTypes.func,
  callOpenTable: React.PropTypes.func,
  getFriendList: React.PropTypes.func,
  getFriendHistory: React.PropTypes.func,
  addFriend: React.PropTypes.func,
  setChatWindow: React.PropTypes.func,
  setNewListener: React.PropTypes.func,
  setGeoListener: React.PropTypes.func,
};


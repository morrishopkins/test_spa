import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import LeftNav from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import * as actionCreators from '../../actions/auth';


function mapStateToProps(state) {
  return {
    token: state.auth.token,
    username: state.auth.username,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export class LoginHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
			selectedIndex: 0,
    };

    this.btnStyle = {
      margin: 12,
			width: '20px',
    };

		this.select = (index) => this.setState({ selectedIndex: index });
  }

  dispatchNewRoute(route) {
    browserHistory.push(route);
  //  this.setState({
  //    open: false,
  //  });

  }


  logout(e) {
    e.preventDefault();
    this.props.logoutAndRedirect();
    this.setState({
      open: true,
    });
  }

  openNav() {
    this.setState({
      open: true,
    });
  }


  closeNav() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
            <header>
                <LeftNav open={this.state.open}>
                            <div>
                                <MenuItem onClick={() => this.dispatchNewRoute('/login')}>
                                    Login
                                </MenuItem>
                                <MenuItem onClick={() => this.dispatchNewRoute('/register')}>
                                    Register
                                </MenuItem>
                            </div>
                </LeftNav>
                  <AppBar
                    title="Party.io"
                    onLeftIconButtonTouchTap={() => this.openNav()}
                    iconElementRight={
                        <FlatButton label="Home" onClick={() => this.dispatchNewRoute('/')} />
                      }
                  />
            </header>
        );
  }
}

LoginHeader.propTypes = {
  logoutAndRedirect: React.PropTypes.func,
  isAuthenticated: React.PropTypes.bool,
};


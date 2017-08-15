/* eslint camelcase: 0, no-underscore-dangle: 0 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import Paper from 'material-ui/Paper';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/data';

function mapStateToProps(state) {
  return {
    data: state.data,
    token: state.auth.token,
    loaded: state.data.loaded,
    isFetching: state.data.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const style = {
  marginTop: 50,
  paddingBottom: 50,
  paddingTop: 25,
  width: '100%',
  textAlign: 'center',
  display: 'inline-block',
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ProfileView extends React.Component {
  render() {
    return (
            <div className="col-md-6 col-md-offset-3" >
                <Paper style={style}>
                    <div className="text-center">
                    {!this.props.loaded
                        ? <h1>Loading Profile...</h1>
                        :
                          <div>
                            <h2>Profile</h2>
                            <p>{this.props.username}!</p>
                            <p>{this.props.data.data.email}</p>
                            <p onClick={() => browserHistory.push('/main')}> Back to chat </p>
                          </div>
                    }
                    </div>
                </Paper>
            </div>
        );
  }
}

ProfileView.propTypes = {
  username: React.PropTypes.string.isRequired,
  loaded: React.PropTypes.bool,
  data: React.PropTypes.object,
};


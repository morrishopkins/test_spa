import { browserHistory } from 'react-router';

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
} from '../constants/index';

import { parseJSON } from '../utils/misc';
import { get_token, create_user } from '../utils/http_functions';


export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token,
    },
  };
}


export function loginUserFailure(error) {
  localStorage.removeItem('token');
  console.dir(error);
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST,
  };
}

export function logout() {
  localStorage.removeItem('token');
  return {
    type: LOGOUT_USER,
  };
}

export function logoutAndRedirect() {
  return (dispatch) => {
    dispatch(logout());
    browserHistory.push('/');
  };
}

export function redirectToRoute(route) {
  return () => {
    browserHistory.push(route);
  };
}

export function loginUser(email, password) {
  return function loginUserDispatch(dispatch) {
    dispatch(loginUserRequest());
    return get_token(email, password)
            .then(parseJSON)
            .then(response => {
              try {
                console.log(response);
                console.log(' in loginuser function');
                dispatch(loginUserSuccess(response.token));
                browserHistory.push('/main');
              } catch (e) {
                dispatch(loginUserFailure({
                  response: {
                    status: 403,
                    statusText: 'Invalid token',
                  },
                }));
              }
            })
            .catch(error => {
              dispatch(loginUserFailure(error));
            });
  };
}


export function registerUserRequest() {
  return {
    type: REGISTER_USER_REQUEST,
  };
}

export function registerUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: REGISTER_USER_SUCCESS,
    payload: {
      token,
    },
  };
}

export function registerUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function registerUser(username, email, password, pgp_key) {
  return function registerUserDispatch(dispatch) {
    dispatch(registerUserRequest());
    return create_user(username, email, password, pgp_key)
            .then(parseJSON)
            .then(response => {
              try {
                dispatch(registerUserSuccess(response.token));
                browserHistory.push('/main');
              } catch (e) {
                console.log('in the python catch block');
                console.dir(e);
                console.dir(response);
                dispatch(registerUserFailure({
                  response: {
                    status: 403,
                    statusText: 'Invalid token',
                  },
                }));
              }
            })
            .catch(error => {
                console.log('in the promise error block');
                console.dir(error);
              dispatch(registerUserFailure({
                response: {
                  status: error.response.status,
                  statusText: error.response.data.message,
                },
              }));
            });
  };
}

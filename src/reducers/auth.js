import jwtDecode from 'jwt-decode';

import { createReducer } from '../utils/misc';
import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
} from '../constants/index';

const initialState = {
  token: null,
  username: null,
  user_id: null,
  avatar: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
  isRegistering: false,
  isRegistered: false,
  registerStatusText: null,
};

export default createReducer(initialState, {
  [LOGIN_USER_REQUEST]: (state) =>
        Object.assign({}, state, {
          isAuthenticating: true,
          statusText: null,
        }),
  [LOGIN_USER_SUCCESS]: (state, payload) => {
      console.log('Login Succes Payload: ');
      console.dir(jwtDecode(payload.token));
      return Object.assign({}, state, {
          isAuthenticating: false,
          isAuthenticated: true,
          token: payload.token,
          username: jwtDecode(payload.token).username,
          user_id: jwtDecode(payload.token).user_id,
          avatar: jwtDecode(payload.token).avatar,
          statusText: 'You have been successfully logged in.',
        }); },
  [LOGIN_USER_FAILURE]: (state, payload) => {
        console.log('A: ');
        console.dir(payload);
        return Object.assign({}, state, {
          isAuthenticating: false,
          isAuthenticated: false,
          token: null,
          username: null,
          user_id: null,
          avatar: null,
          statusText: `Authentication Error: ${payload.status} ${payload.statusText}`,
        });
      },
  [LOGOUT_USER]: (state) =>
        Object.assign({}, state, {
          isAuthenticated: false,
          token: null,
          username: null,
          user_id: null,
          avatar: null,
          statusText: 'You have been successfully logged out.',
        }),
  [REGISTER_USER_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
          isAuthenticating: false,
          isAuthenticated: true,
          isRegistering: false,
          token: payload.token,
          username: jwtDecode(payload.token).username,
          user_id: jwtDecode(payload.token).user_id,
          avatar: jwtDecode(payload.token).avatar,
          registerStatusText: 'You have been successfully logged in.',
        }),
  [REGISTER_USER_REQUEST]: (state) =>
        Object.assign({}, state, {
          isRegistering: true,
        }),
  [REGISTER_USER_FAILURE]: (state, payload) => {
        console.log('B: ');
        console.dir(payload);
        return Object.assign({}, state, {
          isAuthenticated: false,
          token: null,
          avatar: null,
          username: null,
          user_id: null,
          registerStatusText: `Register Error: ${payload.statusText}`,
        });
      },
});

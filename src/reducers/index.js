import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import data from './data';
import chat from './chat';

const rootReducer = combineReducers({
  routing: routerReducer,
    /* your reducers */
  auth,
  data,
  chat,
});

export default rootReducer;

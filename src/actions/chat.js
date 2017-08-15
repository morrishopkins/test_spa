/* global socket */
import {
    CHAT_MESSAGES_REQUEST,
    CHAT_MESSAGES_SUCCESS,
    CHAT_MESSAGES_FAILURE,
    FRIEND_LIST_REQUEST,
    FRIEND_LIST_SUCCESS,
    FRIEND_LIST_FAILURE,
    FRIEND_HISTORY_REQUEST,
    FRIEND_HISTORY_SUCCESS,
    FRIEND_HISTORY_FAILURE,
    ADD_FRIEND_REQUEST,
    ADD_FRIEND_SUCCESS,
    ADD_FRIEND_FAILURE,
    NEW_CHAT_CHANNEL,
    ADD_MESSAGE,
    SET_IS_PARTY,
    PARTY_LIST_REQUEST,
    PARTY_LIST_SUCCESS,
    PARTY_LIST_FAILURE,
    PARTY_HISTORY_REQUEST,
    PARTY_HISTORY_SUCCESS,
    PARTY_HISTORY_FAILURE,
    ADD_PARTY_REQUEST,
    ADD_PARTY_SUCCESS,
    ADD_PARTY_FAILURE,
} from '../constants/index';

import { parseJSON } from '../utils/misc';
import {
        socket_msg,
        socket_party_msg,
         callUberCall,
         callOpenTableCall,
         friendlistCall,
         friendHistoryCall,
         addFriendCall,
         addFriendToPartyCall,
         addPartyCall,
         partylistCall,
         partyHistoryCall,
       } from '../utils/http_functions';


export function chatMessagesRequest() {
  return {
    type: CHAT_MESSAGES_REQUEST,
  };
}

export function chatMessagesSuccess() {
  return {
    type: CHAT_MESSAGES_SUCCESS,
  };
}

export function chatMessagesFailure(error) {
  return {
    type: CHAT_MESSAGES_FAILURE,
    payload: error,
  };
}


export function send_chat(msg, party_name, receiver, sender) {
  return function send_chat_dispatch(dispatch) {
    dispatch(chatMessagesRequest());
    return socket_msg(msg, party_name, receiver, sender, () => {
      try {
        dispatch(chatMessagesSuccess());
      } catch (e) {
        console.log('There was an error while calling socket_msg');
        console.dir(e);
        dispatch(chatMessagesFailure());
      }
    });
  };
}

export function send_party_chat(msg, party_name, party_id, uname) {
  return function send_party_chat_dispatch(dispatch) {
    dispatch(chatMessagesRequest());
    return socket_party_msg(msg, party_name, party_id, uname, () => {
      try {
        dispatch(chatMessagesSuccess());
      } catch (e) {
        console.log('There was an error while calling socket_party_msg');
        console.dir(e);
        dispatch(chatMessagesFailure());
      }
    });
  };
}


export function setChatWindow(party_name, party_id) {
  const partyid = party_id || -1;
  return {
    type: NEW_CHAT_CHANNEL,
    payload: {
      party_name,
      party_id: partyid,
    },
  };
}


export function addMessage(party_name, message) {
  return {
    type: ADD_MESSAGE,
    payload: {
      message,
      party_name,
    },
  };
}

export function setIsParty(isParty, receiver) {
  return {
    type: SET_IS_PARTY,
    payload: {
      isParty,
      receiver,
    },
  };
}

/**
 * @param party_name {string} in this case the party_name field is used for either one-on-one chats or party chats.
 * @param isParty {boolean} tells us if this is a party or one-on-one chat.
 * @param receiver {receiver} the username of the user receiving one-on-one chat.
 **/
export function setNewListener(party_name, isParty, receiver) {
  return function setNewListenerDispatch(dispatch) {
    dispatch(setIsParty(isParty, receiver));
    socket.removeAllListeners();
    console.log(`setting up listener on ${party_name}`);
    console.log(party_name);
    socket.on(party_name, (data) => {
      console.log('received message from server');
      console.log(data);
      dispatch(addMessage(party_name, data));
      document.getElementById('messagelist').scrollTop = 9999;
    });
  };
}

export function partyListRequest() {
  return {
    type: PARTY_LIST_REQUEST,
  };
}

export function partyListSuccess(payload) {
  return {
    type: PARTY_LIST_SUCCESS,
    payload,
  };
}

export function partyListFailure(error) {
  return {
    type: PARTY_LIST_FAILURE,
    payload: error,
  };
}

export function getPartyList() {
  return function getPartyListDispatch(dispatch) {
    console.log('In the getPartyList function');
    dispatch(partyListRequest());
    const token = localStorage.getItem('token');
    return partylistCall(token, (data) => {

      try {
        console.log('Getting back the partylist');
        console.log(data);
        dispatch(partyListSuccess(data));
      } catch (e) {
        console.log('There was an error while calling partylist');
        console.dir(e);
        dispatch(partyListFailure());
      }
    });

  };
}

export function addNewPartyListener(username) {
  return function addNewPartyListenerDispatch(dispatch) {
    socket.on(`${username}_newparty`, () => {
        dispatch(getPartyList());
    });
  };
}

export function setGeoListener(username) {
  return function setGeoListenerDispatch() {
    socket.on(`${username}__geo`, (data) => {
      console.log('Inside of the setGeoListener awesome');
      console.dir(data);
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('got the position information for user:');
        console.dir(position);
        socket.emit('geodata', { party_name: data.party_name, receiver: data.receiver, msgtext: data.msgtext, username, latitude: position.coords.latitude.toFixed(3), longitude: position.coords.longitude.toFixed(3) });
      });
    });
  };
}

export function friendListRequest() {
  return {
    type: FRIEND_LIST_REQUEST,
  };
}

export function friendListSuccess(payload) {
  return {
    type: FRIEND_LIST_SUCCESS,
    payload,
  };
}

export function friendListFailure(error) {
  return {
    type: FRIEND_LIST_FAILURE,
    payload: error,
  };
}

export function getFriendList() {
  return function getFriendListDispatch(dispatch) {
    dispatch(friendListRequest());
    const token = localStorage.getItem('token');
    return friendlistCall(token, (data) => {
      try {
        dispatch(friendListSuccess(data));
      } catch (e) {
        console.log('There was an error while calling friendlist');
        console.dir(e);
        dispatch(friendListFailure());
      }
    });

  };
}

export function friendHistoryRequest() {
  return {
    type: FRIEND_HISTORY_REQUEST,
  };
}

export function friendHistorySuccess(messages, party_name) {
  return {
    type: FRIEND_HISTORY_SUCCESS,
    payload: {
      messages,
      party_name,
    },
  };
}

export function friendHistoryFailure(error) {
  return {
    type: FRIEND_HISTORY_FAILURE,
    payload: error,
  };
}

export function getFriendHistory(friendName, party_name) {
  return function getFriendHistoryDispatch(dispatch) {
    dispatch(friendHistoryRequest());
    const token = localStorage.getItem('token');
    return friendHistoryCall(friendName, token, (data) => {
      console.dir('The data in friend History');
      console.dir(data.data);
      try {
        console.log('Getting the party history back:::::::');
        console.dir(data);
        dispatch(friendHistorySuccess(data.data, party_name));
        document.getElementById('messagelist').scrollTop = 9999;
      } catch (e) {
        console.log('There was an error while calling friendHistory');
        console.dir(e);
        dispatch(friendHistoryFailure());
      }
    });

  };
}

export function addFriendRequest() {
  return {
    type: ADD_FRIEND_REQUEST,
  };
}

export function addFriendSuccess() {
  return {
    type: ADD_FRIEND_SUCCESS,
  };
}

export function addFriendFailure(error) {
  return {
    type: ADD_FRIEND_FAILURE,
    payload: error,
  };
}

export function addFriend(email) {
  return function addFriendDispatch(dispatch) {
    dispatch(addFriendRequest());
    const token = localStorage.getItem('token');
    console.log('inside of the addFriend action');
    console.log(email);
    return addFriendCall(email, token, () => {
      try {
        dispatch(addFriendSuccess());
        console.log('inside of add friend but about to call getfriendlist');
        dispatch(getFriendList());
      } catch (e) {
        console.log('There was an error while adding a friend');
        console.dir(e);
        dispatch(addFriendFailure());
      }
    });
  };
}

export function partyHistoryRequest() {
  return {
    type: PARTY_HISTORY_REQUEST,
  };
}

export function partyHistorySuccess(messages, party_name) {
  return {
    type: PARTY_HISTORY_SUCCESS,
    payload: {
      messages,
      party_name,
    },
  };
}

export function partyHistoryFailure(error) {
  return {
    type: PARTY_HISTORY_FAILURE,
    payload: error,
  };
}

export function getPartyHistory(party_id, party_name) {
  return function getPartyHistoryDispatch(dispatch) {
    dispatch(partyHistoryRequest());
    const token = localStorage.getItem('token');
    return partyHistoryCall(party_id, token, (data) => {
      console.dir('The data in party History');
      console.dir(data.data);
      try {
        dispatch(partyHistorySuccess(data.data, party_name));
        document.getElementById('messagelist').scrollTop = 9999;
      } catch (e) {
        console.log('There was an error while calling partyHistory');
        console.dir(e);
        dispatch(partyHistoryFailure());
      }
    });

  };
}

export function addPartyRequest() {
  return {
    type: ADD_PARTY_REQUEST,
  };
}

export function addPartySuccess() {
  return {
    type: ADD_PARTY_SUCCESS,
  };
}

export function addPartyFailure(error) {
  return {
    type: ADD_PARTY_FAILURE,
    payload: error,
  };
}

export function addParty(party_name) {
  return function addPartyDispatch(dispatch) {
    dispatch(addPartyRequest());
    const token = localStorage.getItem('token');
    console.log('inside of the addParty action');
    console.log(party_name);
    return addPartyCall(party_name, token, () => {
      try {
        dispatch(addPartySuccess());
        console.log('inside of add party and about to call getpartylist');
        dispatch(getPartyList());
      } catch (e) {
        console.log('There was an error while adding a party');
        console.dir(e);
        dispatch(addPartyFailure());
      }
    });
  };
}


export function addFriendToParty(friend, partyid) {
  return function addFriendToPartyDispatch() {
    const token = localStorage.getItem('token');
    console.log('inside of the addFriendToParty action');
    console.log(friend, partyid);
    return addFriendToPartyCall(friend, partyid, token, () => {
      try {
        console.log('inside of add friend to the party success callback');
      } catch (e) {
        console.log('There was an error while adding a friend to the party');
        console.dir(e);
      }
    });
  };
}


export function callUber(addr) {
  return function callUberDispatch() {
    return callUberCall(addr)
            .then(parseJSON)
            .then(response => {
              try {
                console.log(response);
              } catch (e) {
                console.log(e);
              }
            })
            .catch(error => {
              console.log(error);
            });
  };
}

export function callOpenTable(id, covers, datetime) {
  return function callOpenTableDispatch() {
    return callOpenTableCall(id, covers, datetime)
            .then(parseJSON)
            .then(response => {
              try {
                console.log(response);
              } catch (e) {
                console.log(e);
              }
            })
            .catch(error => {
              console.log(error);
            });
  };
}

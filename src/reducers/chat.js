import { createReducer } from '../utils/misc';
import {
    CHAT_MESSAGES_SUCCESS,
    CHAT_MESSAGES_FAILURE,
    CHAT_MESSAGES_REQUEST,
    FRIEND_LIST_SUCCESS,
    FRIEND_LIST_FAILURE,
    FRIEND_LIST_REQUEST,
    FRIEND_HISTORY_REQUEST,
    FRIEND_HISTORY_SUCCESS,
    FRIEND_HISTORY_FAILURE,
    ADD_FRIEND_SUCCESS,
    ADD_FRIEND_FAILURE,
    ADD_FRIEND_REQUEST,
    NEW_CHAT_CHANNEL,
    ADD_MESSAGE,
    SET_IS_PARTY,
    PARTY_LIST_SUCCESS,
    PARTY_LIST_FAILURE,
    PARTY_LIST_REQUEST,
    PARTY_HISTORY_REQUEST,
    PARTY_HISTORY_SUCCESS,
    PARTY_HISTORY_FAILURE,
    ADD_PARTY_SUCCESS,
    ADD_PARTY_FAILURE,
    ADD_PARTY_REQUEST,
} from '../constants/index';

const initialState = {
  party_name: 'Lobby',
  party_id: -1,
  receiver: null,
  friendlist: [],
  friendListStatusText: null,
  friendHistoryStatusText: null,
  messages: [],
  allMessages: {},
  messagesStatusText: null,
  addFriendStatusText: null,
  isParty: true,
  partylist: [],
  partyListStatusText: null,
  addPartyStatusText: null,
};


export default createReducer(initialState, {
  [CHAT_MESSAGES_REQUEST]: (state) =>
        Object.assign({}, state, {
          messagesStatusText: null,
        }),
  [CHAT_MESSAGES_SUCCESS]: (state) => {
   console.log('chatmessagesuccess.');
    return Object.assign({}, state, {
          messagesStatusText: 'messages retreived successfully.',
        }); },
  [CHAT_MESSAGES_FAILURE]: (state) =>
        Object.assign({}, state, {
          messagesStatusText: 'error retreiving messages.',
        }),
  [FRIEND_LIST_REQUEST]: (state) =>
        Object.assign({}, state, {
          friendListStatusText: null,
        }),
  [FRIEND_LIST_SUCCESS]: (state, payload) => {
   console.log('friendlistsuccess.');
   console.dir(payload);
    return Object.assign({}, state, {
          friendListStatusText: 'friendlist retreived successfully.',
          friendlist: payload.data,
        }); },
  [FRIEND_LIST_FAILURE]: (state) =>
        Object.assign({}, state, {
          friendListStatusText: 'error retreiving friendlist.',
        }),
  [FRIEND_HISTORY_REQUEST]: (state) =>
        Object.assign({}, state, {
          friendHistoryStatusText: null,
        }),
  [FRIEND_HISTORY_SUCCESS]: (state, payload) => {
    if (state.allMessages[payload.party_name].length > 1) { return state; }
      console.log('friendhistorysuccess.');
      console.dir(payload);
      const newstate = Object.assign({}, state, {
        allMessages: Object.assign({}, state.allMessages, { [payload.party_name]: state.allMessages[payload.party_name].slice().concat(payload.messages) }),
        messages: state.allMessages[payload.party_name].slice().concat(payload.messages),
        friendHistoryStatusText: 'friend history retreived successfully.',
      });
      return newstate;
  },
  [FRIEND_HISTORY_FAILURE]: (state) =>
        Object.assign({}, state, {
          friendHistoryStatusText: 'error retreiving friend history.',
        }),
  [NEW_CHAT_CHANNEL]: (state, payload) => {
      console.log('In NEW_CHAT_CHANNEL reducer');
      console.dir(payload);
      const updatedAllMessages = Object.assign({}, ({ [payload.party_name]: [] }), state.allMessages);
      console.log('allmessages: ');
      console.dir(updatedAllMessages);
      const updatedMessages = updatedAllMessages[payload.party_name].slice();
      console.log('messages: ');
      console.dir(updatedMessages);
      const newstate = Object.assign({}, state, {
          party_name: payload.party_name,
          party_id: payload.party_id,
          allMessages: updatedAllMessages,
          messages: updatedMessages,
          messagesStatusText: null,
        });
      // console.log('----__------__');
      // console.dir(newstate);
    return newstate;
  },

  [ADD_MESSAGE]: (state, payload) => {
    console.log('In ADD_MESSAGE reducer');
    console.dir(payload);
    return Object.assign({}, state, {
          allMessages: Object.assign({}, state.allMessages, { [payload.party_name]: state.allMessages[payload.party_name].slice().concat([payload.message]) }),
          messages: state.allMessages[payload.party_name].slice().concat([payload.message]),
          messagesStatusText: null,
        }); },
  [ADD_FRIEND_REQUEST]: (state) =>
        Object.assign({}, state, {
          addFriendStatusText: null,
        }),
  [ADD_FRIEND_SUCCESS]: (state) => {
   console.log('addfriend success.');
    return Object.assign({}, state, {
          addFriendStatusText: 'addFriend done successfully.',
        }); },
  [ADD_FRIEND_FAILURE]: (state) =>
        Object.assign({}, state, {
          addFriendStatusText: 'error adding a friend.',
        }),
  [SET_IS_PARTY]: (state, payload) =>
        Object.assign({}, state, {
          isParty: payload.isParty,
          receiver: payload.receiver,
        }),
  [PARTY_LIST_REQUEST]: (state) =>
        Object.assign({}, state, {
          partyListStatusText: null,
        }),
  [PARTY_LIST_SUCCESS]: (state, payload) => {
   console.log('partylistsuccess.');
   console.dir(payload);
    return Object.assign({}, state, {
          partyListStatusText: 'partylist retreived successfully.',
          partylist: payload.data,
        }); },
  [PARTY_LIST_FAILURE]: (state) =>
        Object.assign({}, state, {
          partyListStatusText: 'error retreiving partylist.',
        }),
  [PARTY_HISTORY_REQUEST]: (state) =>
        Object.assign({}, state, {
          partyHistoryStatusText: null,
        }),
  [PARTY_HISTORY_SUCCESS]: (state, payload) => {
      if (state.allMessages[payload.party_name].length > 1) { return state; }
      console.log('partyhistorysuccess.');
      console.dir(payload);
      const newstate = Object.assign({}, state, {
        allMessages: Object.assign({}, state.allMessages, { [payload.party_name]: state.allMessages[payload.party_name].slice().concat(payload.messages) }),
        messages: state.allMessages[payload.party_name].slice().concat(payload.messages),
        partyHistoryStatusText: 'party history retreived successfully.',
      });
      return newstate;
  },
  [PARTY_HISTORY_FAILURE]: (state) =>
        Object.assign({}, state, {
          partyHistoryStatusText: 'error retreiving party history.',
        }),
  [ADD_PARTY_REQUEST]: (state) =>
        Object.assign({}, state, {
          addPartyStatusText: null,
        }),
  [ADD_PARTY_SUCCESS]: (state) => {
   console.log('addparty success.');
    return Object.assign({}, state, {
          addPartyStatusText: 'addParty done successfully.',
        }); },
  [ADD_PARTY_FAILURE]: (state) =>
        Object.assign({}, state, {
          addPartyStatusText: 'error adding a party.',
        }),
});


/* eslint max-len: 0, no-param-reassign: 0 */

export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];


    return reducer
            ? reducer(state, action.payload)
            : state;
  };
}


export function parseJSON(response) {
  return response.data;
}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


/*
 * Only one special char (._-) allowed and it must not be at the extremas of the string
 * The first character cannot be a number
 * All the other characters allowed are letters and numbers
 * The total length should be between 3 and 20 chars
 */
export function validateUsername(username) {
  const re = /(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$/;
  function usernameAlreadyUsed(uname) {
    return typeof uname === 'undefined';
  }
  if (usernameAlreadyUsed(username)) {
    return false;
  }
  return re.test(username);
}


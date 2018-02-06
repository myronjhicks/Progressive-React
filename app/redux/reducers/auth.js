import * as types from '../config/types';
import initialState from '../config/initialState';

export function auth(state = initialState.auth, action){
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      var newState = { loggedIn: true, user: action.user };
      return { loggedIn: true, user: action.user }
    case types.LOGIN_FAIL:
      const { error } = action;
      return { loggedIn: false, error };
    case types.LOGOUT_SUCCESS:
      var newState = { loggedIn: false };
      return newState;
    default:
      return state
  }
}

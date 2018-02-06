import firebase from "../../config/firebase";
import * as types from '../config/types';

export const createUserSuccess = (response) => {
  return {
    type: types.CREATE_USER_SUCCESS,
    user: response
  }
}

export const createUserFail = (error) => {
  return {
    type: types.CREATE_USER_FAIL,
    error
  }
}

export const loginSuccess = (response) => {
  return {
    type: types.LOGIN_SUCCESS,
    user: response
  }
}

export const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS,
  };
}

export const loginFail = (error) => {
  return {
    type: types.LOGIN_FAIL,
    error
  }
}

export const createUser = (email, pass) => dispatch => {
    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((response) => {
      return dispatch(createUserSuccess(response))
    })
    .catch((error) => dispatch(createUserFail));
}

export const singInWithEmailAndPass = (email, pass) => dispatch => {
  firebase.auth().signInWithEmailAndPassword(email, pass)
  .then((response) => {
    return dispatch(loginSuccess(response))
  })
  .catch((e) => {
    const error = {
      code: e.code,
      message: e.message
    };
    return dispatch(loginFail(error));
  });
}

export const logout = () => dispatch => {
  firebase.auth().signOut().then(() => {
    dispatch(logoutSuccess());
  });
}

export const subscribeToAuthState = () => dispatch => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      dispatch(loginSuccess(user));
    }
  });
}

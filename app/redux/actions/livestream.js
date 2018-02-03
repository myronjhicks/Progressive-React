import firebase from "../../config/firebase";
import * as types from '../config/types';

const database = firebase.database();


function updateLivestream(id){
  return {
    type: types.LIVESTREAM_UPDATED,
    id
  };
}

export function listenToLivestream() {
  return (dispatch) => {
    database.ref('livestream').on('value', function(snap){
      const { event } = snap.val();
      dispatch(updateLivestream(event));
    })
  }
}

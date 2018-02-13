import firebase from "../../config/firebase";
import * as types from '../config/types';

const database = firebase.database();

function updateWorshipGuide(link){
  return {
    type: types.GUIDE_UPDATED,
    link
  };
}

export function listenToWorshipGuide() {
  return (dispatch) => {
    database.ref('worship_guide').on('value', function(snap){
      const { link } = snap.val();
      dispatch(updateWorshipGuide(link));
    })
  }
}

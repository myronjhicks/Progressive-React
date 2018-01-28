import firebase from "../../config/firebase";
const database = firebase.database();

const LIVESTREAM_UPDATED = 'LIVESTREAM_UPDATED';

function updateLivestream(id){
  return {
    type: LIVESTREAM_UPDATED,
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

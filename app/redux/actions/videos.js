import firebase from "../../config/firebase";
import * as types from '../config/types';
const ref = firebase.database().ref('livestreams');

function addVideo(video){
  return {
    type: types.VIDEO_ADDED,
    video
  };
}

function removeVideo(id){
  return {
    type: types.VIDEO_REMOVED,
    id
  }
}

function updateVideo(video) {
  return {
    type: types.VIDEO_UPDATED,
    video
  };
}

export function listenToVideos() {
    return (dispatch) => {
      firebase.firestore().collection('videos')
          .orderBy('date', 'asc')
          .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(function(change) {
              if (change.type === "added") {
                const video = {
                  key: change.doc.id,
                  ...change.doc.data()
                }
                dispatch(addVideo(video));
            }
          })
        })
    };
};

export function addLiveStream(data, successCB, errorCB){
  return (dispatch) => {
    ref.push(data)
      .then(() => successCB(true, null, null))
      .catch((error) => errorCB(false, null, error));
  }
}

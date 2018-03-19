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
        ref.on('child_added', function(snap){
          const data = snap.val();
          const video = {
              key: snap.key,
              date: data.created_at,
              title: data.title,
              speaker: data.speaker,
              video_url: data.video_url,
              caption: data.caption,
              tags: []
          };
          dispatch(addVideo(video));
        });
        ref.on('child_removed', function(snap){
          dispatch(removeVideo(snap.key));
        });
        ref.on('child_changed', function(snap){
          const data = snap.val();
          const video = {
              key: snap.key,
              date: data.created_at,
              title: data.title,
              speaker: data.speaker,
              video_url: data.video_url,
              tags: []
          };
          dispatch(updateVideo(video));
        });
    };
};

export function addLiveStream(data, successCB, errorCB){
  return (dispatch) => {
    ref.push(data)
      .then(() => successCB(true, null, null))
      .catch((error) => errorCB(false, null, error));
  }
}

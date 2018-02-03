import firebase from "../../config/firebase";
import * as types from '../config/types';
const ref = firebase.database().ref('videos');


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
              date: data.date,
              title: data.title,
              speaker: data.speaker,
              id: data.id,
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
              date: data.date,
              title: data.title,
              speaker: data.speaker,
              id: data.id,
              tags: []
          };
          dispatch(updateVideo(video));
        });
    };
};

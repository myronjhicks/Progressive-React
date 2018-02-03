import * as types from '../config/types';
import firebase from "../../config/firebase";

const ref = firebase.database().ref('events');

function addEvent(event){
  return {
    type: types.EVENT_ADDED,
    event
  };
}

function removeEvent(id){
  return {
    type: types.EVENT_REMOVED,
    id
  }
}

export function listenToEvents() {
    return (dispatch) => {
        ref.on('child_added', function(snap){
          const { date, time, title } = snap.val();
          var momentDate = new Date(date);
          const event = {
            key: snap.key,
            date: momentDate,
            time: time,
            title: title
          }
          dispatch(addEvent(event));
        });
        ref.on('child_removed', function(snap){
          dispatch(removeEvent(snap.key));
        })
    };
};

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

function updateEvent(event) {
  return {
    type: types.EVENT_UPDATED,
    event
  };
}

export function submitEvent(event) {
  const { title, subtitle, location, timestamp }  = event;
  ref.push({
      title: title,
      subtitle: subtitle,
      timestamp: timestamp,
      location: location
  });
}

export function listenToEvents() {
    return (dispatch) => {
        ref.on('child_added', function(snap){
          const { title, subtitle, location, timestamp } = snap.val();
          const event = {
            key: snap.key,
            title: title,
            timestamp: timestamp,
            subtitle: subtitle,
            location: location
          };
          dispatch(addEvent(event));
        });
        ref.on('child_removed', function(snap){
          dispatch(removeEvent(snap.key));
        });
        ref.on('child_changed', function(snap){
          const { title, subtitle, location, timestamp } = snap.val();
          const event = {
            key: snap.key,
            title: title,
            timestamp: timestamp,
            subtitle: subtitle,
            location: location
          };
          dispatch(updateEvent(event));
        });
    };
};

export function deleteEventById(id) {
    ref.child(id).remove().then(() => {
      console.log('removed successfully');
    })
}

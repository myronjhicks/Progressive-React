import firebase from "../../config/firebase";
const database = firebase.database();
import * as types from '../config/types';

function addAnnouncement(announcement){
  return {
    type: types.ANNOUNCEMENT_ADDED,
    announcement
  };
}

function removeAnnouncement(id) {
  return {
    type: types.ANNOUNCEMENT_REMOVED,
    id
  }
}

function updateAnnouncement(announcement) {
  return {
    type: types.ANNOUNCEMENT_UPDATED,
    announcement
  };
}

export function listenToAnnouncements() {
  return (dispatch) => {
    database.ref('announcements').on('child_added', function(snap){
      const { text, timestamp } = snap.val();
      const announcement = {
        key: snap.key,
        text: text,
        timestamp: timestamp
      };
      dispatch(addAnnouncement(announcement));
    });
    database.ref('announcements').on('child_removed', function(snap){
      dispatch(removeAnnouncement(snap.key))
    });
    database.ref('announcements').on('child_changed', function(snap){
      const { text, timestamp } = snap.val();
      const announcement = {
        key: snap.key,
        text: text,
        timestamp: timestamp
      };
      dispatch(updateAnnouncement(announcement));
    });
  };
}

import firebase from "../../config/firebase";
const database = firebase.database();

const ANNOUNCEMENT_ADDED = 'ANNOUNCEMENT_ADDED';
const ANNOUNCEMENT_REMOVED = 'ANNOUNCEMENT_REMOVED';

function addAnnouncement(announcement){
  return {
    type: ANNOUNCEMENT_ADDED,
    announcement
  };
}

function removeAnnouncement(id) {
  return {
    type: ANNOUNCEMENT_REMOVED,
    id
  }
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
      console.log(snap.key);
      dispatch(removeAnnouncement(snap.key))
    });
  };
}

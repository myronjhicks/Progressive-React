import firebase from "../../config/firebase";

const database = firebase.database();

const EVENT_ADDED = 'EVENT_ADDED';

function addEvent(event){
  return {
    type: EVENT_ADDED,
    event
  };
}

export function listenToEvents() {
    return (dispatch) => {
        database.ref('events').on('child_added', function(snap){
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
    };
};

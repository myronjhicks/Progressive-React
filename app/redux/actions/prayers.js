import firebase from "../../config/firebase";
import * as types from '../config/types';
const ref = firebase.database().ref('prayerwall');


function addPrayer(prayer){
  return {
    type: types.PRAYER_ADDED,
    prayer
  };
}

function removePrayer(id){
  return {
    type: types.PRAYER_REMOVED,
    id
  }
}

function updatePrayer(prayer) {
  return {
    type: types.PRAYER_UPDATED,
    prayer
  };
}

export function listenToPrayers() {
    return (dispatch) => {
        ref.on('child_added', function(snap){
          const { date, name, content, claps } = snap.val();
          const prayer = {
              key: snap.key,
              date: date,
              name: name,
              content: content,
              claps: claps
          };
          dispatch(addPrayer(prayer));
        });
        ref.on('child_removed', function(snap){
          dispatch(removePrayer(snap.key));
        });
        ref.on('child_changed', function(snap){
          const { date, name, content, claps } = snap.val();
          const prayer = {
              key: snap.key,
              date: date,
              name: name,
              content: content,
              claps: claps
          };
          dispatch(updatePrayer(prayer));
        });
    };
};

export function updateClaps(key, numClaps){
  ref.child(key).update({claps: numClaps});
};

export function submitPrayer(data) {
  const { name, content, date }  = data;
  ref.push({
      name: name,
      content: content,
      date: date,
      claps: 0
  });
}

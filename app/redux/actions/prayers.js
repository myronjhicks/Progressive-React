import firebase from "../../config/firebase";

const ref = firebase.database().ref('prayerwall');

const PRAYER_ADDED = 'PRAYER_ADDED';
const PRAYER_REMOVED = 'PRAYER_REMOVED';
const PRAYER_UPDATED = 'PRAYER_UPDATED';


function addPrayer(prayer){
  return {
    type: PRAYER_ADDED,
    prayer
  };
}

function removePrayer(id){
  return {
    type: PRAYER_REMOVED,
    id
  }
}

function updatePrayer(prayer) {
  return {
    type: PRAYER_UPDATED,
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

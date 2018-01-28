import firebase from "../../config/firebase";

const ref = firebase.database().ref('prayerwall');

const PRAYER_ADDED = 'PRAYER_ADDED';
const PRAYER_REMOVED = 'PRAYER_REMOVED';


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

export function listenToPrayers() {
    return (dispatch) => {
        ref.on('child_added', function(snap){
          const { date, name, content } = snap.val();
          const prayer = {
              key: snap.key,
              date: date,
              name: name,
              content: content,
          };
          dispatch(addPrayer(prayer));
        });
        ref.on('child_removed', function(snap){
          dispatch(removePrayer(snap.key));
        })
    };
};

export function submitPrayer(data) {
  const { name, content, date }  = data;
  ref.push({
      name: name,
      content: content,
      date: date
  });
}

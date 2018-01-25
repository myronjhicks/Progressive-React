
import firebase from "../../config/firebase";

const database = firebase.database();

export function announcementsHasError(bool) {
    return {
        type: 'ANNOUNCEMENTS_HAS_ERRORED',
        hasErrored: bool,
    };
};

export function announcementsIsLoading(bool) {
    return {
        type: 'ANNOUNCEMENTS_IS_LOADING',
        isLoading: bool,
    };
};

export function announcementsFetchSuccess(announcements) {
    return {
        type: 'ANNOUNCEMENTS_FETCH_DATA_SUCCESS',
        announcements
    };
};


export function fetchAnnouncements() {
    return (dispatch) => {
        dispatch(announcementsIsLoading(true));

        database
        .ref('announcements')
        .once('value')
        .then(function(snapshot){
            dispatch(announcementsIsLoading(false));
            var announcements = [];
            snapshot.forEach(function(childSnapshot){
                var data = childSnapshot.val();
                announcements.push({
                    key: childSnapshot.key,
                    text: data.text,
                    timestamp: data.timestamp,
                });
            });
            dispatch(announcementsFetchSuccess(announcements));
        });
    };
};

import firebase from "../../config/firebase";

const firestore = firebase.firestore();

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
        firestore
        .collection('announcements')
        .get()
        .then(function(querySnapshot){
            dispatch(announcementsIsLoading(false));
            const announcements = [];
            querySnapshot.forEach( (doc) => {
                const {text, timestamp } = doc.data();
                announcements.push({
                    key: doc.id,
                    text: text,
                    timestamp: timestamp,
                });
            });
            dispatch(announcementsFetchSuccess(announcements));
        });
    };
};
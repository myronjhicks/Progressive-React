
import firebase from "../../config/firebase";

const firestore = firebase.firestore();

export function eventsHasError(bool) {
    return {
        type: 'EVENTS_HAS_ERRORED',
        hasErrored: bool,
    };
};

export function eventsIsLoading(bool) {
    return {
        type: 'EVENTS_IS_LOADING',
        isLoading: bool,
    };
};

export function eventsFetchDataSuccess(events) {
    return {
        type: 'EVENTS_FETCH_DATA_SUCCESS',
        events
    };
};


export function fetchEvents() {
    return (dispatch) => {
        firestore
        .collection('events')
        .get()
        .then(function(querySnpshot){
            querySnpshot.forEach(function(doc){

            });
        });
    };
};
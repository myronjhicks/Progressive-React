import * as firebase from 'firebase';
import 'firebase/firestore';
import {
    FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID
} from './constants';

// Initialize Firebase
var config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

export default firebase;

// This code creates an instance of the Firebase SDK and configures it with your config.
// It can be imported anywhere in code and it’s always this singleton.
//

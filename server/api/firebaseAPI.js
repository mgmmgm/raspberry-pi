import * as firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyB5wYwvr8Xv5mtF3lrfrBGZ5tk-th-tg_Y",
    authDomain: "raspberrypi-7e834.firebaseapp.com",
    databaseURL: "https://raspberrypi-7e834.firebaseio.com",
    projectId: "raspberrypi-7e834",
    storageBucket: "raspberrypi-7e834.appspot.com",
    messagingSenderId: "517689121101"

};

const db;

function initFirebase() {
    console.log('init firebase', firebase.apps.length);
    try {
        let defaultDB = firebase.initializeApp(config);
        db = defaultDB.database();
    } catch(err) {
        // we skip the "already exists" message which is
        // not an actual error when we're hot-reloading
        if (!/already exists/.test(err.message)) {
            console.error('Firebase initialization error', err.stack)
        }
    }
    return firebase;
}

function getDatabase() {
    return db.ref('data');
}

module.exports = {
    initFirebase, getData
}
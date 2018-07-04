import * as firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

var db;

function initFirebase() {
    console.log('init firebase', firebase.apps.length);
    try {
        let defaultDB = firebase.initializeApp(config);
        db = defaultDB.database();
        console.log('db', db);
    } catch(err) {
        // we skip the "already exists" message which is
        // not an actual error when we're hot-reloading
        if (!/already exists/.test(err.message)) {
            console.error('Firebase initialization error', err.stack)
        }
    }
    return firebase;
}

function getData() {
    return db.ref('data');

}



export {
    initFirebase, getData
}
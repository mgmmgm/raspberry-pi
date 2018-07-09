import * as firebase from 'firebase/app';
import 'firebase/database';

let db;

function initFirebase(config) {
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
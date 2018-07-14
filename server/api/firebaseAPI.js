// import * as firebase from 'firebase/app';
// import 'firebase/database';

let firebase = require('firebase/app');
require('firebase/database');

let db;

function initFirebase(config) {
    // console.log('init firebase', firebase.apps.length);
    try {
        // let defaultDB = firebase.initializeApp(config);
        // db = defaultDB.database();
        firebase.initializeApp(config);
        db = firebase.database();
    } catch(err) {
        // we skip the "already exists" message which is
        // not an actual error when we're hot-reloading
        if (!/already exists/.test(err.message)) {
            console.error('Firebase initialization error', err.stack)
        }
    }
}

readDataFromDB = (link) => {
    return db.ref(link).once('value');
}

writeDataToDB = (link, data) => {
    return db.ref(link).set(data);
}

module.exports = {
    initFirebase, readDataFromDB, writeDataToDB
}
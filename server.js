const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./server/route');

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
const server = require('http').Server(app);  
const io = require('socket.io')(server);

const firebaseConfig = require('./server/configuration/firebaseConfiguration');
// const firebase = require('./server/api/firebaseAPI');
let dbFirebase;

(() => {
    console.log('config ', firebaseConfig.getFirebaseConfiguration());
    firebase.initFirebase(firebaseConfig.getFirebaseConfiguration());
    dbFirebase = firebase.getDatabase();
})();


app.use((req, res, next) => {
  res.io = io;
  next();
});


app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/led', router);


io.on('connection', function(client) {  
  console.log('new client has joined', client.id);
  io.emit('message-from-server', 'Welcome ' + client.id);

  client.on('event-from-client', function(data) {
      console.log('A client sent us this dumb message:', data.message);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

// don't forget to connect phone via wifi network

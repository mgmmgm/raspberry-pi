const express = require('express');
const bodyParser = require('body-parser');
const led = require('./ledAPI');

const app = express();
app.use(bodyParser.json());
var server = require('http').Server(app);  
var io = require('socket.io')(server);

const port = process.env.PORT || 5000;

app.get('/led', (req, res) => {
  // ledId = req.params.id;
  let ledState = led.getLedState();
  res.send({ state: ledState });
});

app.post('/led', (req, res) => {
  let state = req.body.state;
  console.log(state);
  if (state === 'on') {
    led.toggleLed(1);
    res.send('led is on');
  } else if (state === 'off') {
    led.toggleLed(0);
    res.send('led is off');
  } else {
    res.status(500).send('bad request');
  }
})

app.delete('/led', (req, res) => {
  led.unexportOnClose();
  res.send('close and turn off all');
});

io.on('connection', function(client) {  
  console.log('new client has joined', client.id)
  io.emit('message-from-server', 'Welcome ' + client.id);

  client.on('event-from-client', function(data) {
      console.log('A client sent us this dumb message:', data.message);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

// don't forget to connect phone via wifi network

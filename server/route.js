const express = require('express');
const router = express.Router();
const led = require('./api/ledAPI');

router.get('/', (req, res) => {
    // ledId = req.params.id;
    let ledState = led.getLedState();
    res.send({ state: ledState });
  });
  
  router.post('/', (req, res) => {
    let state = req.body.state;
    console.log(state);
    if (state === 'on') {
      led.toggleLed(1);
      res.io.emit('message-from-server', 'Led is on');
      res.send('led is on');
    } else if (state === 'off') {
      led.toggleLed(0);
      res.io.emit('message-from-server', 'Led is off');
      res.send('led is off');
    } else {
      res.status(500).send('bad request');
    }
  })
  
  router.delete('/', (req, res) => {
    led.unexportOnClose();
    res.send('close and turn off all');
  });


module.exports = router;
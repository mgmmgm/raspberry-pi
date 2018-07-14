const express = require('express');
const router = express.Router();
// const led = require('./api/ledAPI');
const firebaseAPI = require('./api/firebaseAPI');
const link = 'lights/led1';

router.get('/', async(req, res) => {
    // ledId = req.params.id;
    let snapshot = await firebaseAPI.readDataFromDB(link);
    console.log(snapshot.val());
    let ledState = snapshot.val();//led.getLedState();
    res.send({ state: ledState });
  });
  
  router.post('/', async(req, res) => {
    let state = req.body.state;
    console.log(state);
    if (state === 'on') {
      //led.toggleLed(1);
      await firebaseAPI.writeDataToDB(link, 1);
      res.io.emit('message-from-server', 'Led is on');
      res.send({statusFromServer: 1});
    } else if (state === 'off') {
      //led.toggleLed(0);
      await firebaseAPI.writeDataToDB(link, 0);
      res.io.emit('message-from-server', 'Led is off');
      res.send({statusFromServer: 0});
    } else {
      res.status(500).send('bad request');
    }
  });
  
  router.delete('/', (req, res) => {
    led.unexportOnClose();
    res.send('close and turn off all');
  });


module.exports = router;
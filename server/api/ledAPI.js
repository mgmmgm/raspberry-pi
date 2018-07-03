const sleep = require('system-sleep');
const Gpio = require('onoff').Gpio;
const LED = new Gpio(17, 'out');
const pushButton = new Gpio(27, 'in', 'both');

function blinkXTimes(number) {
	for (let i=0; i < number; i++) {
		LED.writeSync(1);
		sleep(500);
		LED.writeSync(0);
		sleep(500);
	}	
}

function toggleLed(state) {
	LED.writeSync(state);
}

function getLedState() {
	return LED.readSync();
}

function watchForPushButton() {
	pushButton.watch((err, value) => {
		if (err) {
			console.error('There is an error: ', err);
			return;
		}

		if (value) {
			LED.writeSync(LED.readSync() ^ 1);
		}
	});
}


function unexportOnClose() {

	LED.writeSync(0);
	LED.unexport();
	pushButton.unexport();
}

process.on('SIGINT', unexportOnClose);

module.exports = {toggleLed, getLedState, blinkXTimes, watchForPushButton, unexportOnClose}

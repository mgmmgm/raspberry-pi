
let io;

const setIO = (ioObj) => {
    io = ioObj;
}

const sendUpdateToAllClients = (snapshot) => {
    let state = snapshot.val();
    io.emit('message-from-server', {status: state, msg: 'Led is ' + state ? 'on' : 'off'});
}

module.exports = {setIO, sendUpdateToAllClients}
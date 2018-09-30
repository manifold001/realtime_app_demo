const express = require('express')
const bodyParser = require('body-parser');
const EventEmitter = require('events').EventEmitter
const WebSocket = require('ws');

const app = express();
const port = 3000;
const messageBus = new EventEmitter(); 

const server = app.listen(port, () => {
    console.log("Listening on port: ", port);
});

app.use(bodyParser.json())

app.post('/messages', (request, response) => {
    messageBus.emit('message', request.body);
    response.status(200).end();
});


const wss = new WebSocket.Server({server});
const listerners = [];

wss.on('connection', (socket, message) => {
    listerners.push(socket);
});

messageBus.on('message', (message) => {
    for (let socket of listerners) {
        socket.send(JSON.stringify(message));
    }
});


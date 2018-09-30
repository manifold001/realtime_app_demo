const express = require('express');
const EventEmitter = require('events').EventEmitter
const bodyParser = require('body-parser')

const messageBus = new EventEmitter();
messageBus.setMaxListeners(100);

const app = express();
const port = 3000;

app.use((request, response, next) => {
    console.log(request.headers);
    next();
});

app.use((request, response, next) => {
    request.chance = Math.random();
    next();
});

app.use(bodyParser.json())

app.get('/messages', (request, response) => {
    let addMessageListener = (res) => {
        messageBus.once('message', (data) => {
            res.json(data);
        });
    };
    addMessageListener(response);
});

app.post('/messages', (request, response) => {
    console.log("POST: ", request.body);
    messageBus.emit('message', request.body);
    response.status(200).end();
});


app.listen(port);
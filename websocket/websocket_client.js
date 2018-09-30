const WebSocket = require('ws');

// simulate ten clients

for(let i = 0; i < 10; ++i) {
    let ws = new WebSocket('ws://localhost:3000');
    ws.on('message', (data) => {
        console.log(`#${i}, received: `, data)
    });
}
const http = require('http');

const long_pool = (url, id) => {
    http.get(url, (res) => {
        res.on('data', (chunk) => {
            console.log(`#${id} received: `, chunk);
        })

        res.on('end', () => {
            long_pool(url, id);
        });
    }).on('error', (err) => {
        console.log('Error: ', err);
    });
};

for(let i = 0; i < 10; i++) {
    long_pool("http://localhost:3000/messages", i);
}
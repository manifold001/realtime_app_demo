const http = require('http');

const long_pool = (url, id) => {
    http.get(url, (res) => {
        let data = "";
        res.on('data', (chunk) => {
            data += chunk;
        })

        res.on('end', () => {
            console.log(`#${id}, received: `, JSON.parse(data));
            long_pool(url, id);
        });
    }).on('error', (err) => {
        console.log('Error: ', err);
    });
};

for(let i = 0; i < 10; i++) {
    long_pool("http://localhost:3000/messages", i);
}
const http = require('http');

const server = http.createServer((request, response) => {
    if (request.url === '/') {

        response.end('Home page');
    }
    else if (request.url === '/about') {
        response.end('About page');
    }
    else {

        response.end('404 not found');
    }
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});

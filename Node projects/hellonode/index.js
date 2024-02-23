/*const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, () => {
   console.log(`Server is running at port ${port}`); 
});*/

const http = require('http');

const port = 3000;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello Node.js');
});

server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
}); 
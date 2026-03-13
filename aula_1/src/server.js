// forma CommonJS de importar um módulo
// const http = require('http')

// forma ESmodules de importação
import http from 'node:http';

const server = http.createServer((request, response) => {
    return response.end('Hello World!');
})

server.listen(3333);





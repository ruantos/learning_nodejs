// forma CommonJS de importar um módulo
// const http = require('http')

// forma ESmodules de importação
import http from 'node:http';

const hostname = '127.0.0.1';
const port = '3000';

const users = [];

const server = http.createServer((request, response) => {
    const { method, url } = request;

    console.log(method, url)
    if (method === 'GET' && url === '/users') {
        
        return response
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }
    
    if (method === 'POST' && url === '/users') {
        users.push(
            {
                'id': 1,
                'name': 'John Doe',
                'email': 'johndoe@email.com',
                'age': 31,
            }
        );
        return response.writeHead(201).end()
    }

    return response.writeHead(404).end();
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/users`)
});





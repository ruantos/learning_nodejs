import http from 'node:http'; 
import { json } from '../middlewares/json.js';
import { Database } from './database.js';

const port = 3000;
const hostname = 'localhost';

const db = new Database; 

const server = http.createServer( async(req, res) => {
  
  const { method, url } = req;   
  
  await json(req, res);

  if (method === 'GET' && url === '/users') {
    return res
          .end(JSON.stringify(db.select('users')))
  }
  
  if ( method === 'POST' && url === '/users' ) {
    const { id, nome, idade, caracteristica } = req.body;
    
    db.insert(
      'users',
      {
        id: id,
        nome: nome,
        idade: idade,
        caracteristica: caracteristica
      }
    );
    
    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();

})

server.listen(port, hostname)
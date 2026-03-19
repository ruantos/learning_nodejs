import { Database } from './database.js';
import { randomUUID } from 'node:crypto'; 

const database = new Database; 


export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (req, res) => {
      const users = database.select('users');
  
      return res.end(JSON.stringify(users))
    }

  },

  {
    method: 'POST',
    path: '/users',
    handler: (req, res) => {
      const { nome, idade, caracteristica } = req.body;
      database.insert(
        'users',
        {
          id: randomUUID(),
          nome: nome,
          idade: idade,
          caracteristica: caracteristica
        });
      return res.writeHead(201).end();

    }


  },
]
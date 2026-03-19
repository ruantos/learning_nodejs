import { buildRoutePath } from './build_route_path.js';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto'; 

const database = new Database; 


export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const users = database.select('users');
  
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
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
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {

      database.delete('users', req.params.id);
      return res.writeHead(204).end();
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const id = req.params.id;
      const { nome, idade, caracteristica } = req.body;

      database.update('users', id, 
        {
          nome, 
          idade,
          caracteristica
        }
      );
      return res.writeHead(204).end();
    }
  },
]
import http from 'node:http'; 

const port = 8080;
const hostname = 'localhost';

const users = []; 

// const nome = 'Mai';
// const idade = 23;
// const caracteristica = 'Ser muito gentil';

const server = http.createServer( async(req, res) => {
  const { method, url } = req; 
  
  
  
  
  if (method === 'GET' && url === '/users') {
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }
  
  if ( method === 'POST' && url === '/users' ) {
    
    const buffers = [];

    // reune as info do body da requisição
    for await( const chunks of req) {
      buffers.push(chunks);
    }

    // converte para json
    const body = JSON.parse( Buffer.concat(buffers).toString() );
    // coleta os parâmetros
    const { nome, idade, caracteristica } = body;
    
    // sobe para o db
    users.push(
      {
        nome: nome,
        idade: idade,
        caracteristica: caracteristica
      });
    
    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();

})

server.listen(port, hostname)
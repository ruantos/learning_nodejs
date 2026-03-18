import http from 'node:http';
import { Transform } from 'node:stream';


const port = 3334;
const hostname = 'localhost';


class InverseNumberStream extends Transform {
  // lê de uma stream e escreve para uma stream
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    const buf = Buffer.from(String(transformed));
    callback(null, buf)
  }
}


const server = http.createServer( async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const all_together = Buffer.concat(buffers).toString();
  
  console.log(all_together);

  // return req
  //           .pipe(new InverseNumberStream)
  //           .pipe(res);
});


server.listen(port, hostname);

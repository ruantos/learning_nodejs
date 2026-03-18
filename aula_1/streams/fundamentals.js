import { Readable, Writable, Transform } from 'node:stream';
import { buffer } from 'node:stream/consumers';

class OneToHundredStream extends Readable {
  // lê chunks de dados de uma fonte conforme chegam
  // apenas lê
  index = 1;

  _read() {
    const i = this.index ++;
    
    setTimeout( () => {
      
      if (i > 100) {
        this.push(null);
      } else {
  
        const buf = String(i);
        this.push(buf + ' ');
      }

    }, 1000 );

  }
}

class MultiplyByTenStream extends Writable {
  // processa chunks de dados de uma fonte e escreve conforme chegam.
  // apenas escreve 
  _write(chunk, enconding, callback) {
    console.log( Number( chunk.toString() ) * 10 );
    callback();
  }
}

class InverseNumberStream extends Transform {
  // lê de uma stream e escreve para uma stream
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    const buf = Buffer.from(String(transformed));
    callback(null, buf)
  }
}


// const oth = new OneToHundredStream();
// const mbt = new MultiplyByTenStream();


new OneToHundredStream()
  .pipe( new InverseNumberStream() ) 
  .pipe( new MultiplyByTenStream() );
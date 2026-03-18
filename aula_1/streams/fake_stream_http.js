import { Readable } from 'node:stream';


class OneToHundredStream extends Readable {
  // lê chunks de dados de uma fonte conforme chegam
  // apenas lê
  index = 1;

  _read() {
    const i = this.index ++;
    
    setTimeout( () => {
      
      if (i > 10) {
        this.push(null);
      } else {
  
        const buf = String(i);
        this.push(buf + ' ');
      }

    }, 1000 );

  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half',
});
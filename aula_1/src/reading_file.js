import fs from 'fs';

const path = 'teste.txt';

// reading file asynchroniously 

// runs next code while this loads 
fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error readind file: ' + err);
        return;
    }
    console.log('File content: ' + data);
})


// runs first 
console.log('Running file...');


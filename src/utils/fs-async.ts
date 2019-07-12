const fs = require('fs');
const { promisify } = require('util');

export const readFileAsync = promisify(fs.readFile);
export const writeFileAsync = promisify(fs.writeFile);


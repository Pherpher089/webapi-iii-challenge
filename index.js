require('dotenv').config();
// code away!
const server = require('./server.js');

const port = process.env.PORT;

server.listen(port, ()=> console.log(`Magic Happening on port ${port})`));
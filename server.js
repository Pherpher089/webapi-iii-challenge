const express = require('express');
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

//Apply middleware 
const server = express();
server.use(express.json());
server.use(logger);
//Apply routes 
server.use('/api/user', userRouter);
server.use('/api/post', postRouter);


//Request Handeler
server.get('/', (req, res) => {
  res.status(200).json({message: 'Lets write some express middleware!'})
});

//custom middleware
function logger(req, res, next) {
  console.log(`Method Call: ${req.method} - URL: ${req.originalUrl} - Time Requested: ${+ new Date().getTime()/1000}`)
  res.status(201)
    next();
};

module.exports = server;

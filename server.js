const express = require('express');
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');
const morgan = require('morgan');
require('dotenv').config();

//Apply middleware 
const server = express();
server.use(express.json());
server.use(logger);
//Apply routes 
server.use('/api/user', userRouter);
server.use('/api/post', postRouter);

//Using .evn vars
const messageOfTheDay = process.env.MOTD || 'No env vars';

//Request Handeler
server.get('/', (req, res) => {
  res.status(200).json({message: messageOfTheDay})
});

//custom middleware
function logger(req, res, next) {
  console.log(`Method Call: ${req.method} - URL: ${req.originalUrl} - Time Requested: ${+ new Date().getTime()/1000}`)
  res.status(201)
    next();
};

module.exports = server;

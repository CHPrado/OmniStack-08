const cors = require('cors');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
let io = require('socket.io');

const app = express();
const server = new (http.Server)(app);

io = io(server);

const routes = require('./routes');


const connectedUsers = {

};

io.on('connection', (socket) => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;
});


mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-wkgvv.mongodb.net/tindev?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);

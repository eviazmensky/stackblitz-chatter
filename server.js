var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var socketIO = require('socket.io');
var io = socketIO(server);
var cors = require('cors');
var messages = [];
var users = [];
var events = require('events');
var eventEmitter = new events();

app.use(cors());
app.use(function(req, res, next) {
  req.testing = 'testing';
  return next();
});
app.use(express.json());

server.listen(3000, () => {
  console.log('started listening on port 3000');
});

app.get('/', function(req, res, next) {
  console.log('get route', req.testing);
  res.send({ resp: `I'm alive` });
  res.end();
});

app.get('/loadAll', (req, res) => {
  res.send({
    chatHistory: messages
  });
});

app.get('/allUsers', (req, res) => {
  res.send(users);
});

app.post('/addUser', (req, res) => {
  const newUserName = req.body.UserName;
  if (verifyName(newUserName)) {
    const newUser = {
      userName: newUserName,
      id: Date.now().toString(),
      active: false
    };
    users.push(newUser);
    res.statusCode = 202;
    res.send();
    eventEmitter.emit('userAdded', newUser);
  } else {
    res.statusCode = 409;
    res.send();
  }
});

app.post('/activeUser', (req, res) => {
  setActive(req.body.userId);
  eventEmitter.emit('activeUserSet');
  res.send({ message: 'success' });
});

eventEmitter.on('userAdded', user => {
  io.emit('userAdded', user);
});

eventEmitter.on('activeUserSet', () => {
  io.emit('userActive', users);
});

io.on('connection', socket => {
  console.log(socket.id);
  socket.emit('connection', 'connected');

  socket.on('message', message => {
    messages.push(message);
    io.emit('message', message);
  });

  socket.on('verifyUserName', userName => {
    socket.emit('verifiedUserName', verifyName(userName));
  });

  socket.on('userAdded', () => {
    console.log('user added live');
  });

  socket.on('deactivateUser', user => {
    if (user) {
      users.forEach((userItem, index) => {
        if (userItem.id === user.id && users[index].active) {
          users[index].active = false;
        }
      });
      eventEmitter.emit('activeUserSet');
    }
  });
});

let verifyName = function(userName) {
  return !users.some(user => user.userName === userName);
};

let setActive = function(id) {
  users.forEach((user, index) => {
    if (user.id === id) {
      users[index].active = true;
    }
  });
};

/// SETUP EXPRESS ///
var express = require('express');
var app = express();

/// SETUP SERVER ///
var server = require('http').Server(app);

var io = require('socket.io')(server);

var clientNsp = io.of('/client');
var adminNsp = io.of('/admin');

/// LOAD HELPER MODEULES ///
var bodyParser = require('body-parser');
var path = require('path');
var SocketList = require('./utilities/socketlist-handler');

/// SETUP MIDDLEWARE ///
app.use(bodyParser.json()); // for parsing application/json

/// START SERVER ///
server.listen(3000, function(){
  console.log('listening on port 3000');
});

/// SETUP ROUTES ///
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/stylesheets', express.static(path.join(__dirname, '../public/stylesheets')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));


/// MAIN ROUTE ///
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/client.html'));
});

/// MAIN ROUTE ///
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

///SOCKET IO EVENTS ///
var MAX_ADMIN = 3;

var userList = new SocketList();
var adminList = new SocketList(MAX_ADMIN);

var clientServerOnline = true;

/// SETUP ADMIN SOCKET ///

adminNsp.on('connection', function(socket){

  console.log('admin connected');

  socket.on('add admin', function(userData){

    var result = adminList.addUser(socket.id, userData);

    if(result){
      adminNsp.emit('welcome', 'you are now an admin');
    } else {
      adminNsp.emit('welcome', 'max number of admins already connected');
      socket.disconnect();
    }

    //get any stragglers that mau have gotten here early
    clientNsp.emit('get user info');

  });

  socket.on('toggle online status', function(){
    clientServerOnline = !clientServerOnline;

    if(clientServerOnline){
      clientNsp.emit('get user info');
    } else {

      clientNsp.emit('connection closed');
      userList.reset();
      adminNsp.emit('admin updated client list', userList.getList()); //send list to Admin user
    }
  });

  socket.on('get client list', function(){
    adminNsp.emit('admin updated client list', userList.getList()); //send list to Admin user
  });

  socket.on('disconnect', function(){
    adminList.removeUser(socket.id);
  });

  socket.on('latency', function (startTime, cb) {
    cb(startTime);
  });

  socket.on('admin command', function(data){
    console.log('admin command', data);

    adminNsp.emit(data.message, data.params);
    clientNsp.emit(data.message, data.params);
  });

  socket.on('photo added', function(data){
    adminNsp.emit('photo added', data);
  });

});

/// SETUP CLIENT SOCKETS ///
clientNsp.on('connection', function(socket){

  console.log('client connected');

  socket.on('add user', function(userData){
    if(clientServerOnline){
      userList.addUser(socket.id, userData);
      clientNsp.emit('welcome');

      //let the admin know!
      adminNsp.emit('admin updated client list', userList.getList()); //send list to Admin user
    }
  });

  socket.on('disconnect', function(){
    userList.removeUser(socket.id);
    adminNsp.emit('admin updated client list', userList.getList()); //send list to Admin user
  });

  socket.on('remove user', function(){
    userList.removeUser(socket.id);
    adminNsp.emit('admin updated client list', userList.getList()); //send list to Admin user
  });

  socket.on('latency', function (startTime, cb) {
    cb(startTime);

  });

});

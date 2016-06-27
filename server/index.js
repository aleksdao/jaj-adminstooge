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
//below used to get ip addresses from local machine
var ifaces = require('os').networkInterfaces();
var request = require('request');

/// SETUP MIDDLEWARE ///
app.use(bodyParser.json()); // for parsing application/json

/// START SERVER ///
server.listen(3000, function(){
  console.log('listening on port 3000');
});

/// SETUP ROUTES ///
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/img', express.static(path.join(__dirname, '../public/img')));
app.use('/stylesheets', express.static(path.join(__dirname, '../public/stylesheets')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

/// MAIN ROUTE ///

app.get('/app', function (req, res){
  res.sendFile(path.join(__dirname, '../public/client.html'));
});
app.get('/app/*', function (req, res){
  res.sendFile(path.join(__dirname, '../public/client.html'));
});

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

  socket.on('refresh client list', function(){
    //get any stragglers that mau have gotten here early
    clientNsp.emit('get user info');

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

  socket.on('photo process done', function(data){
    console.log('admin socket');
    adminNsp.emit('photo process done', data);
  });

  socket.on('contest random', function(data){
    var winner = userList.randomUser();

    if(winner){
      clientNsp.to(winner.id).emit('contest winner', data.params.text);

    }

  });

});

/// SETUP CLIENT SOCKETS ///
clientNsp.on('connection', function(socket){

  userList.addUser(socket.id);
  adminNsp.emit('admin updated client list', userList.getList()); //send list to Admin user

  socket.on('add user', function(userData){
    if(clientServerOnline){
      userList.addUser(socket.id, userData);
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

///this entire lower section reports the ip addresses
/////begin find ip address
// Iterate over interfaces ...
var adresses = Object.keys(ifaces).reduce(function (result, dev) {
  return result.concat(ifaces[dev].reduce(function (result, details) {
    return result.concat(details.family === 'IPv4' && !details.internal ? [details.address] : []);
  }, []));
});
// Log the local ip address result
console.log('Local IP address is :', adresses.slice(3));

var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
};
var builtIP = 'https://nsync-dns.herokuapp.com/socket?socketIP=' + adresses.slice(3) +':3000';
// Configure the request
var options = {
    url: builtIP,
    method: 'POST',
    headers: headers
};
//post ip address to Heroku DNS server
request(options, function (error, response, body) {
    if(error){console.log('error in here', error);}
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(adresses.slice(3)+':3000', body, 'to Heroku DNS');
    }
});

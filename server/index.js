/// SETUP EXPRESS ///
var express = require('express');
var app = express();

/// SETUP SERVER ///
var server = require('http').Server(app);
var io = require('socket.io')(server);

/// LOAD HELPER MODEULES ///
var bodyParser = require('body-parser');
var path = require('path');

/// SETUP MIDDLEWARE ///
app.use(bodyParser.json()); // for parsing application/json

/// START SERVER ///
server.listen(3000, function(){
  console.log('listening on port 3000');
});

/// SETUP ROUTES ///
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use('/js', express.static(path.join(__dirname, '../public/js')));

/// MAIN ROUTE ///
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/client', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/client.html'));
});

///SOCKET IO EVENTS ///

io.on('connect', function(socket){
  console.log('user connected');

  /// CLIENT DISCONNECT ///
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  /// ADMIN BROADCAST ///
  socket.on('admin broadcast', function(msgToSend){

    //echo message to all users
    console.log('sending admin msg');
    io.emit(msgToSend.type, msgToSend.eventData);
  });

});

/// SOCKET IO HANDLER ///

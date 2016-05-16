/// SETUP EXPRESS ///
var express = require('express');
var app = express();

/// SETUP SERVER ///
var server = require('http').Server(app);
var io = require('socket.io')(server);

/// LOAD HELPER MODEULES ///
var path = require('path');

/// START SERVER ///
server.listen(3000, function(){
  console.log('listening on port 3000');
});

/// SETUP ROUTES ///
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

app.use('/admin', require('./routes/admin.routes'));

//app.use('/', express.static(path.join(__dirname, './public')));

/// MAIN ROUTE ///
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

/// SOCKET IO HANDLER ///
io.on('connection', function (socket) {
  console.log('user connected');
  io.emit('hello', 'yo yo oy y o');

});

io.on('disconnect', function (socket) {
  console.log('user disconnnected');
});

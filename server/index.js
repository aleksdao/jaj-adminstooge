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
app.use('/stylesheets', express.static(path.join(__dirname, '../public/stylesheets')));


/// MAIN ROUTE ///
app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

/// MAIN ROUTE ///
app.get('/', function (req, res) {
  res.send('go away');
});

// app.get('/client', function (req, res) {
//   res.sendFile(path.join(__dirname, '../public/client.html'));
// });

///SOCKET IO EVENTS ///
var adminUser; //stores socket ID for admin
var users = [];

io.on('connection', function(socket){

  var addedUser = false; //has this user connected before?

  socket.on('add user', function(name){

    if(addedUser)
      return;

    addedUser = true;
    users.push({name: name, id: socket.id}); //add to list of users

    io.to(adminUser).emit('admin updated client list', users); //send list to Admin user

  });

  /// CHECK FOR ADMIN ///
  socket.on('admin connected', function(){

    if(adminUser) //we can only have one admin user at a time
      return;

    adminUser = socket.id;

    io.to(adminUser).emit('welcome admin', 'for your eyes only'); //send welcome message to admin

  });

  /// CLIENT DISCONNECT ///
  socket.on('disconnect', function(){

    if(addedUser){

      //find and remove user from list
      var idx = users.findIndex(function(user){
        return user.id == socket.id;
      });

      users.splice(idx, 1);

      //send updated list to admin
      io.to(adminUser).emit('admin updated client list', users);

    }

    //if this was the admin somehow leaving, null the adminUser ID
    //TODO: make the 'socketsever' able to be turned on and off in the front end
    if(socket.id === adminUser)
      adminUser = null;

  });

  /// ADMIN BROADCAST ///
  socket.on('admin broadcast', function(msgToSend){

    //echo message to all users
    console.log('sending admin msg');
    io.emit(msgToSend.type, msgToSend.eventData);
  });

});

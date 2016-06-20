function SocketList(maxConnections){
  this._socketList = [];
  this.maxConnections = maxConnections || Infinity;
}

SocketList.prototype.addUser = function(socketId, data){

  if(!this.inList(socketId) && this._socketList.length <= this.maxConnections){
    this._socketList.push({id: socketId, userData: data});
    return true;
  }
  else
    return false;
};

SocketList.prototype.removeUser = function(socketId){

  //find and remove user from list
  var idx = this._socketList.findIndex(function(user){
    return user.id == socketId;
  });

  this._socketList.splice(idx, 1);
};

SocketList.prototype.inList = function(socketId){
  var idx = -1;
  idx = this._socketList.findIndex(function(user){
    return user.id == socketId;
  });
  return idx > -1;
};

SocketList.prototype.getList = function(){
  return this._socketList;
};

SocketList.prototype.reset = function(socketList){
  this._socketList = [];
};

SocketList.prototype.randomUser = function(){
  console.log(this._socketList)
  var random = Math.floor(Math.random() * this._socketList.length);
  //console.log(this._socketList[random])
  return this._socketList[random];

};



module.exports = SocketList;

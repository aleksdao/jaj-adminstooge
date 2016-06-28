function SocketList(maxConnections){
  this._socketList = [];
  this.maxConnections = maxConnections || Infinity;
  this.lastRandom = -1;
}

SocketList.prototype.addUser = function(socketId, data){

  var idx = this.inList(socketId);

  if(idx === -1 && this._socketList.length <= this.maxConnections){
    this._socketList.push({id: socketId, userData: data});
    return true;
  } else if(idx > -1 && this._socketList.length <= this.maxConnections){
    this._socketList[idx].userData = data;
    return true;
  } else
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
  return idx;
};



SocketList.prototype.getList = function(){
  return this._socketList;
};

SocketList.prototype.reset = function(socketList){
  this._socketList = [];
};

SocketList.prototype.randomUser = function(){

  var working = true;
  var winner;

  if(this._socketList.length<=1)
    return this._socketList[0];

  //loop through till we have a new winner
  while(working){
    //pick new random
    var random = Math.floor(Math.random() * this._socketList.length);

    if(this.lastRandom == random){
      //keep looking
    } else {
      winner = random;
      this.lastRandom = winner;
      working = false;
    }

  }

  //found one
  return this._socketList[winner];
};



module.exports = SocketList;

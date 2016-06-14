app.factory('SongFactory', function(ngAudio){

  var song;

  return {

    load: function(path){
      song = ngAudio.load(path);
    },
    play: function(){
      song.play();
    },
    stop: function(){
      song.pause();
      song.setCurrentTime(0);
    }

  };
});

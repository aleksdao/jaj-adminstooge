app.factory('SequenceHandler', function($http, socket){

  var _sequence;
  var _screenElement = {
    container: undefined,
    title: undefined,
    body: undefined
  }; //used to store target DOM objects

  var _actionFunc = {
    changeColor: changeColor,
    fadeColor: fadeColor,
    changeText: changeText,
    vibrate: vibrate,
    strobeFlash: strobeFlash
  };

  return {
    init: function(screenElement){
      _screenElement = screenElement;
    },
    loadSequence: function(sequence){
      _sequence = new Sequence(sequence);
      console.log('_sequence', _sequence)
      //set Transport settings
      Tone.Transport.set(_sequence.getSettings());
      Tone.Transport.scheduleRepeat(this.eventLoop, _sequence.getSettings().resolution, 0);
    },
    fetchShow: function(){
      return $http.get('http://jaj-showeditor.herokuapp.com/api/shows')
      .then(function(response){
        return response.data[0];
      });
    },
    getTransportState: function(){
      return Tone.Transport.state;
    },
    queueStart: function(preRoll, adjustForLatency){
      var startTime = 0;
      adjustForLatency = adjustForLatency || true; //defaults to true

      if(adjustForLatency)
        startTime = (preRoll - socket.getLatency()) / 1000;

      this.stop(); //reset start time
      Tone.Transport.start(startTime); //start Transport
    },
    stop: function(){
      Tone.Transport.position = 0;
      return Tone.Transport.stop();
    },
    eventLoop: function(){
      console.log(_sequence)
      //grab current time code position
      var currPos = Tone.Transport.position;

      //check to see if the show is over, if so, stop Transport
      if (currPos == _sequence.show_length){
          return this.stop();
      }

      //play current events
      _sequence.timeline.forEachAtTime(timelinePos, function(event) {
        if (!event.preload) {
          var duration = (15 / _sequence.getSettings().bpm) * 1000;
          _actionFunc[event.action](event.params, duration);
        }
      });

      //check for preloaded events
      _sequence.timeline.forEachAtTime(currPos + "+" + _sequence.getSettings().resolution, function(event) {
        if (event.preload) {

        }

      });

    }
  };
});

/////// Event Action Functions //////
function changeColor(params){

  console.log('changeColor');

}
function fadeColor(params, duration){
  console.log('fadeColor');

}
function changeText(params){
  console.log('changetext');

}
function vibrate(params){
  console.log('vibrate');

}
function strobeFlash(params, duration){
  console.log('strobe');

}

/////// Sequence obj ///////
function Sequence(sequence){
  if(!sequence)
    return;

  this._sequence = sequence;
  this.timeline = new Tone.Timeline();

  this.generateTimeline();
}

Sequence.prototype.generateTimeline = function(){
    var self = this;

    this._sequence.events.forEach(function(event) {
        self.timeline.addEvent(event);
    });

};

Sequence.prototype.getSettings = function(){
  return this._sequence.settings;
};

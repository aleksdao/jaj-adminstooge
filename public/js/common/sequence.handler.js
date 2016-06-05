app.factory('SequenceHandler', function($http, socket){

  var _sequence;
  var _screenElement = {
    container: undefined,
    title: undefined,
    body: undefined
  }; //used to store target DOM objects

  var transitionTime;

  var _actionFunc = {
    changeColor: changeColor,
    fadeColor: fadeColor,
    changeText: changeText,
    vibrate: vibrate,
    strobeFlash: strobeFlash
  };



  /////// Event Action Functions //////
  function changeColor(params){

    _screenElement.container.css('background-color', params.color);

  }
  function fadeColor(params, duration){
    console.log('fadeColor');

  }
  function changeText(params){
    _screenElement[params.target].text(params.text);

    if(params.color)
      _screenElement[params.target].css('color', params.color);

  }
  function vibrate(params){
    console.log('vibrate');

  }
  function strobeFlash(params, duration){
    console.log('strobe');

  }
  function resetScreen(){
    _screenElement.container.css('background-color', '#eee');
    _screenElement.title.text('');
    _screenElement.body.text('');

  }

  return {
    init: function(screenElement){
      _screenElement.container = angular.element(document.querySelector(screenElement.container));
      _screenElement.title = angular.element(document.querySelector(screenElement.title));
      _screenElement.body = angular.element(document.querySelector(screenElement.body));

    },
    loadSequence: function(sequence){
      _sequence = new Sequence(sequence);

      //set Transport settings
      Tone.Transport.set(_sequence.getSettings());
      Tone.Transport.scheduleRepeat(this.eventLoop, _sequence.getSettings().resolution, 0);
      transitionTime = bpmScale[_sequence.getSettings().resolution] / _sequence.getSettings().bpm;
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
      var startTime;

      if(adjustForLatency)
        startTime = (preRoll - socket.getLatency()) / 1000;
      else
        startTime = preRoll / 1000;

      this.stop(); //reset start time

      Tone.Transport.start("+" + startTime); //start Transport
    },
    stop: function(){
      Tone.Transport.position = 0;
      return Tone.Transport.stop();
    },
    eventLoop: function(){
      //grab current time code position
      var currPos = Tone.Transport.position;

      console.log(currPos);
      //check to see if the show is over, if so, stop Transport
      if (currPos == _sequence.getShowLength()){
        Tone.Transport.position = 0;
        return Tone.Transport.stop();
      }

      //play current events
      _sequence.timeline.forEachAtTime(currPos, function(event) {
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

/// LUT ///
var bpmScale = {
  '4n': 60,
  '8n': 30,
  '16n': 15
};


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

Sequence.prototype.getShowLength = function(){
  return this._sequence.show_length;
};

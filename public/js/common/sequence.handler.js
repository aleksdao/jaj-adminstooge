app.factory('SequenceHandler', function($http, $rootScope, socket, SongFactory){

  var _sequence;
  var song;
  var _screenElement = {
    container: undefined,
    title: undefined,
    body: undefined
  }; //used to store target DOM objects

  var transitionTime;

  var _actionFunc = {
    changeColor: changeColor,
    fadeColorTo: fadeColorTo,
    changeText: changeText,
    vibrate: vibrate,
    strobeFlash: strobeFlash
  };

  /////// Event Action Functions //////
  function changeColor(params){
    setTransitionTime(0);
    _screenElement.container.css("background-color", params.color);
  }
  function fadeColorTo(params, duration){
    setTransitionTime(0);
    _screenElement.container.css("background-color", params.color);
  }
  function changeText(params){
    _screenElement[params.target].text(params.text);

    if(params.color)
      _screenElement[params.target].css('color', params.color);

  }
  function vibrate(params){
    //not implemented on admin side
  }
  function strobeFlash(params, duration){
    //not implemented on admin side
  }
  function resetScreen(){
    _screenElement.container.css('background-color', '#eee');
    _screenElement.title.text(' ');
    _screenElement.body.text(' ');
  }

  // sets CSS transiton time
  function setTransitionTime (timeMs){
    _screenElement.container.css({'transition-duration': timeMs + 'ms'});
  }

  return {
    init: function(screenElement){
      _screenElement.container = angular.element(document.querySelector(screenElement.container));
      _screenElement.title = angular.element(document.querySelector(screenElement.title));
      _screenElement.body = angular.element(document.querySelector(screenElement.body));

    },
    loadSequence: function(sequence){
      //set Transport settings (tempo, time sig, etc)
      Tone.Transport.set(sequence.settings);

      //create timeline
      _sequence = new Sequence(sequence);

      //set up our event handler
      Tone.Transport.scheduleRepeat(this.eventLoop, _sequence.getSettings().resolution, 0);

      //calculate transition time for FX
      transitionTime = (bpmScale[_sequence.getSettings().resolution] / _sequence.getSettings().bpm)*1000;

      //set our css transition on container
      var transSet = {
        'transition-property': 'background-color',
        'transition-timing-function': 'ease-in'
      };
      _screenElement.container.css(transSet);

          },
    fetchAllShows: function(){
      return $http.get('http://jaj-showeditor.herokuapp.com/api/shows')
      .then(function(response){
        return response.data;
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

      Tone.Transport.start("+" + startTime); //start Transport
    },
    stop: function(){
      Tone.Transport.stop();
      Tone.Transport.position = 0;
    },
    eventLoop: function(){
      //grab current time code position
      var currPos = Tone.Transport.position;
      //start the audio?
      if(currPos === '0:0:0'){
        SongFactory.play();
        $rootScope.$broadcast('show started');
      }
      //check to see if the show is over, if so, stop Transport
      if (currPos == _sequence.getShowLength()){
        SongFactory.stop();
        Tone.Transport.stop();
        Tone.Transport.position = 0;
        $rootScope.$broadcast('show ended');

        return;
      }

      //play current events
      _sequence.timeline.forEachAtTime(currPos, function(event) {

        if (!event.preload) {
          _actionFunc[event.action](event.params);

        }
      });

      //check for preloaded events
      _sequence.timeline.forEachAtTime(currPos + '+' + _sequence.getSettings().resolution, function(event) {

        if (event.preload) {
          _actionFunc[event.action](event.params, transitionTime);
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

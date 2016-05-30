app.factory('SequenceHandler', function(socket){

  var _sequence;

  return {

    loadSequence: function(sequence){
      _sequence = new Sequence(sequence);

      //set Transport settings
      Tone.Transport.set(_sequence.getSettings());
      Tone.Transport.scheduleRepeat(this.runEventHandler, _sequence.getSettings().resolution, 0);
    },
    getTransportState: function(){
      return Tone.Transport.state;
    },
    queueStart: function(preRoll, adjustForLatency){
      adjustForLatency = adjustForLatency || true; //defaults to true
      var adjustedStart = (preRoll - socket.getLatency()) / 1000;
      Tone.Transport.start(adjustedStart); //start Transport
    },
    stop: function(){
      Tone.Transport.position = 0;
      return Tone.Transport.stop();
    }
  };
});

/////// Sequence obj ///////
function Sequence(sequence){
  if(!sequence)
    return;

  this._sequence = sequence;
  this.timeline = this.generateTimeline();
}

Sequence.prototype.generateTimeline = function(){
    this.timeline = new Tone.Timeline();

    this._sequence.events.forEach(function(event) {
        timeline.addEvent(event);
    });
};

Sequence.prototype.getSequenceSettings = function(){
  return this._sequence.settings;
};

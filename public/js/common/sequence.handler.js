app.factory('SequenceHandler', function(socket){

  var _sequence;

  return {

    loadSequence: function(sequence){
      _sequence = new Sequence(sequence);
      Tone.Transport.set(_sequence.getSettings());
    },
    getTransportState: function(){
      return Tone.Transport.state;
    },
    queueStart: function(preRoll){

    }

  };

});

/////// Sequence prototype ///////
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

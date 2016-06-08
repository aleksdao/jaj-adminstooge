/// Show Spec v2 ///

{
  show_id: String,
  show_name: String,
  settings:{
    bpm: Number, //default 60
    time_sig: Number, //default 4
    resolution: String //resolution to run tranport at. default 16n
  },
  show_length: String, // in 0:0:0 format
  events:[ //array of events with timestamps
    {
      time: "0:0:0",
      action:"action_name",
      params:{
        //list of params for the action
      },
      group: String, //group ID.. defaults to all groups
      preload: Boolean //queue for next cycle?
  }]
}

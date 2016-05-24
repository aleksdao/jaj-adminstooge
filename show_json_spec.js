/// Show Spec v2 /// 

{
  id: String,
  name: String,
  length: String, // in 0:0:0 format
  settings:
  {
    bpm: Number, //default 60
    time_sig: Number, //default 4
  },
  events:
  { //hashtable of events with timestamps
    "0:0:0": [
        { action: 'actionName', params: {}, group: {} },
        { action: 'actionName', params: {}, group: {} },
      ],
    "0:1:0": []//...etc
  }
}

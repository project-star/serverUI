import { Players } from '../imports/api/players/players.js';
import '/imports/startup/client';
Template.annotations.helpers({
  annotations: function(){
    return Players.find();
  },
  value: function(){
    return "success";
  }
})



import './player.html';
import { Template } from 'meteor/templating';
import { Players } from '../../../api/players/players.js';

Template.player.helpers({
	selected: function () {
		return Session.equals("selectedPlayer", this.__originalId) ? "selected" : '';
	},
        editing: function() {
                return Session.get("target"+this.__originalId);
        
        },
        isLoggeduser: function (owner) {
                return (owner === Meteor.userId());
        },
        selectedName: function () {
                var selectedUri = PlayersIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedPlayer") });
                return selectedUri;
        }
  
});





Template.player.events({
	'click': function () {
		Session.set("selectedPlayer", this.__originalId);
	},
        'click #quotedtextedit': function(e,t){
                Session.set("target"+this.__originalId,true);
                console.log (this.__originalId)
                
        },
        'keypress input': function(e,t){
                if (e.which === 13){
                console.log(t.data._id)
                value = Players.findOne({_id: this.__originalId});
                console.log("value")
                console.log(value)
                console.log(e.currentTarget.value)
                Players.update(value._id,{$set: {quotedtext: e.currentTarget.value}},{strict: true});
                Session.set("target"+this.__originalId,false);
              }
          },
         'click .urledit': function(){
                Session.set("editannot",true);
                            
        }        
        
});




import './leaderboard.html';
import '../players/player.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { EasySearch } from 'meteor/easy:search';
import { Players } from '../../../api/players/players.js';
import { PlayersIndex } from '../../../api/players/players_index.js';
import { $ } from 'meteor/jquery';
import '../../../startup/accounts-config.js' 

Template.leaderboard.helpers({
	inputAttributes: function () {
		return { 'class': 'easy-search-input', 'placeholder': 'Start searching...' };
	},
	players: function () {
                console.log (Players.find({}))
                var value = Players.find({"owner":Meteor.userId()}).fetch();


                return value;
	},
	selectedName: function () {
		var player = PlayersIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedPlayer") });
		return player;
	},
        editannotations: function(){
               return Session.get("editannot");
        },
	index: function () {
		return PlayersIndex;
	},
	resultsCount: function () {
		return PlayersIndex.getComponentDict().get('count');
	},
	showMore: function () {
		return false;
	},
        isLoggeduser: function (owner) {
                return (owner === Meteor.userId());
        },
	renderTmpl: () => Template.renderTemplate
});

Template.leaderboard.events({
	'click .editpage': function () {
		Session.set("editannot",true);
	},
	'change .category-filter': function (e) {
		PlayersIndex.getComponentMethods()
			.addProps('categoryFilter', $(e.target).val());
	}

});

Template.leaderboard.try=function(){
    console.log(Players.find().fetch());
    var value = Players.find().fetch();
    
         
    return value;
}




Template.tagsbar.helpers({
        inputAttributes: function () {
                return { 'class': 'easy-search-input', 'placeholder': 'Start searching...' };
        },
        tagsall: function () {
                console.log("try")
                console.log (Players.find())
                var value = Players.find().fetch();


                return value;
        },
        selectedName: function () {
                var player = PlayersIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedPlayer") });
                return player;
        },
        index: function () {
                return PlayersIndex;
        },
        resultsCount: function () {
                return PlayersIndex.getComponentDict().get('count');
        },
        showMore: function () {
                return false;
        },
        isLoggeduser: function (owner) {
                return (owner === Meteor.userId());
        }
});



Template.tagsbar.events({
        'click .category-filter': function (e) {
                console.log($(e.target).val());
                PlayersIndex.getComponentMethods()
                        .addProps('categoryFilter', $(e.target).val());
        }

});
Template.editpage.helpers({
        selectedurllist: function () {
                var player = PlayersIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedPlayer") });
                var value = Players.find({"owner":Meteor.userId(),"document.web_uri":player.document.web_uri})
                console.log("in edit page")


                return value;
        },
        selectedName: function () {
                var player = PlayersIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedPlayer") });
                console.log(player.document.web_uri)
                console.log("in edit page")
                return player;
        }
        
});
Template.editpage.events({
        'click .doneedit': function () {
          Session.set("editannot",false);
        }

});
Template.first.helpers({
        selectedurl: function () {
                var value = Session.get("selectedPlayer");
                Session.set("selectedurl",value);
                return value;
        },
         editannotations: function(){
               return Session.get("editannot");
        } 

});

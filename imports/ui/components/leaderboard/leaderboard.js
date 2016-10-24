import './leaderboard.html';
import '../players/player.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { EasySearch } from 'meteor/easy:search';
import { Players } from '../../../api/players/players.js';
import { PlayersIndex } from '../../../api/players/players_index.js';
import { $ } from 'meteor/jquery';

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
	'click .inc': function () {
		Meteor.call('updateScore', Session.get("selectedPlayer"));
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


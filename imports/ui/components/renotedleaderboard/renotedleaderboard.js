import './renotedleaderboard.html';
import '../renoted/renoted.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { EasySearch } from 'meteor/easy:search';
import { Renoted } from '../../../api/renoted/renoted.js';
import { RenotedIndex } from '../../../api/renoted/renoted_index.js';
import { $ } from 'meteor/jquery';

Template.renotedleaderboard.helpers({
	inputAttributes: function () {
		return { 'class': 'easy-search-input', 'placeholder': 'Start searching...' };
	},
	renoted: function () {
		return Renoted.find({});
	},
	selectedRenoted: function () {
		var renote = RenotedIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedRenoted") });
		return renote && renote.renoted_id;
	},
	index: function () {
		return RenotedIndex;
	},
	resultsCount: function () {
		return RenotedIndex.getComponentDict().get('count');
	},
	showMore: function () {
		return false;
	},
	renderTmpl: () => Template.renderTemplate
});

Template.renotedleaderboard.events({
	'change .category-filter': function (e) {
		RenotedIndex.getComponentMethods()
			.addProps('categoryFilter', $(e.target).val())
		;
	}
});

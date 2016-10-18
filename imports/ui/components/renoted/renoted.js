import './renoted.html';
import { Template } from 'meteor/templating';

Template.renoted.helpers({
	selected: function () {
		return Session.equals("selectedRenoted", this.__originalId) ? "selected" : '';
	}
});

Template.renoted.events({
	'click': function () {
		Session.set("selectedRenoted", this.__originalId);
	}
});

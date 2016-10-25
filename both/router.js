// both/router.js
import { Players } from '../imports/api/players/players.js';
Router.configure({
  layoutTemplate: 'main'
});
Router.route('/','first');
Router.route('/list', 'annotations');
Router.route('/annotations/:_id', function () {
  var item = Players.findOne({_id: this.params._id});
  this.render('annotation', {data: item});
}, {
  name: 'annotation.show'
});

import { Players } from './players.js';
import { EasySearch } from 'meteor/easy:search';
import { _ } from 'meteor/underscore';

export const PlayersIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    sort: function () {
      return { renoted_id: -1 };
    },
    selector: function (searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
        categoryFilter = options.search.props.categoryFilter;
      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.tags = categoryFilter;
      }

      return selector;
    }
  }),
  collection: Players,
  fields: ['renoted_id','tags','document.web_uri','text','quotedtext','document.title','username'],
  defaultSearchOptions: {
    limit: 8
  },
  permission: (options) => {
    //console.log(Meteor.userId());
    //return (Meteor.userId() === options.owner);
     return true;
  }
});

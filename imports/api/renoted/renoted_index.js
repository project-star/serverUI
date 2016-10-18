import { Renoted } from './renoted.js';
import { EasySearch } from 'meteor/easy:search';
import { _ } from 'meteor/underscore';

export const RenotedIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    selector: function (searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
        categoryFilter = options.search.props.categoryFilter;

      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.text != categoryFilter;
      }

      return selector;
    }
  }),
  collection: Renoted,
  fields: ['renoted_id'],
  defaultSearchOptions: {
    limit: 8
  },
  permission: () => {
    //console.log(Meteor.userId());

    return true;
  }
});

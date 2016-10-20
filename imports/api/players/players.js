import { Mongo } from 'meteor/mongo';

export const Players = new Mongo.Collection("renoted");


Players.allow({
    'update': function () {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    }
  });

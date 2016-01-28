var mongoose = require('mongoose');
var config = require('../config.json');
var Schema = mongoose.Schema;

var replies = mongoose.model(config.collection1, new Schema({
  reply: String,
  input: Array
}));

exports.reply = function(input, cb) {
  replies.findOne({ input: input }, cb);
}

var mongoose = require('mongoose');
var config = require('../config.json');
var Schema = mongoose.Schema;

var replies = mongoose.model(config.collection1, new Schema({
  reply: String,
  input: Array
}));

function greetingDate() {
  if ([6,7,8,9,10,11].indexOf(new Date().getHours()) > -1) {
    return '\ud83c\udf1d Buenos días';
  } else if ([12,13,14,15,16,17,18].indexOf(new Date().getHours()) > -1) {
    return '\ud83c\udf1d Buenas tardes';
  } else {
    return '\ud83c\udf1a Buenas noches';
  }
}

exports.reply = function(input, cb) {
  replies.findOne({ input: input.body.toLowerCase() }, (err, res) => {
    if (res === null) {
      replies.findOne({ input: 'greeting' }, (err, greeting) => {
        greeting.reply = `${greetingDate()} ${input.name} ${greeting.reply}`;
        cb(greeting);
      });
    } else { cb(res); }
  });
}

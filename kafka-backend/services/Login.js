var express = require('express')
var user = require('../../server/models/User')

function handle_request (msg, callback) {
  console.log('Inside  Kafka Backend Login')

        user.findOne({ email: msg.email }).then(user => {
            if (user) {
              if(msg.email === user.email) {
              	callback(null, user);
              } else {
              	callback(null, null);
              }
            } else {
                console.log('Incorrect password');
                callback(null, null);
            }
        });
}
exports.handle_request = handle_request
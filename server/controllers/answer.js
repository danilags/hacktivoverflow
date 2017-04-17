const db = require('../models/answer');
const question = require('../models/question');
const user = require('../models/user');
// const jwt = require('jsonwebtoken');

let getAll = function(req, res) {
  var populateQuery = [{path: 'userid', select:['username', 'email']}, {path: 'questionid', select:['content']}]
  db.find({}).populate(populateQuery).exec(function(err, data) {
    if (!err) {
      res.send(data)
    }
  })
}

let createAnswer = function(req, res) {
  db.create({
    content     : req.body.content,
    userid      : req.body.userid,
    questionid  : req.body.questionid,
    upvote      : [],
    downvote    : []
  }, function(err, data) {
    console.log(data);
    if (err) {
      res.send(err)
    } else {
      user.findByIdAndUpdate(data.userid,
      {$push : {"answer" : data._id}},
      {safe: true, upsert: true, new: true},
        function(err, result) {
          if (!err) {
            question.findByIdAndUpdate(data.questionid,
              {$push : {"answerid" : data._id}},
              {safe: true, upsert: true, new: true},
                function(err, success) {
                  if (err) {
                    res.send(err)
                  } else {
                    res.send(success)
                  }
                }
            )
          }
        }
      )
    }
  })
}

module.exports = {
  getAll,
  createAnswer
}

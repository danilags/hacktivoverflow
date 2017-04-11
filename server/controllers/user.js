const db = require('../models/user');
// const jwt = require('jsonwebtoken');

let getAll = function(req, res) {
  let populateQuery = [{path: 'question', select:['content','userid']}, {path: 'answer', select: ['content','userid']}]
  db.find({}).populate(populateQuery).exec(function(err, user){
    if (!err) {
      res.send(user)
    }
  })
}

let createUser = function(req, res) {
  db.findOne(function(err, data) {
    if (err) {
      res.send("Data Error !")
    } else {
      let newUser = new db({
        username : req.body.username,
        email    : req.body.email,
        password : req.body.password,
        question : [],
        answer   : []
      })
      newUser.save(function(err, data) {
        if (err) {
          res.send(err)
        } else {
          res.send("User success created !")
        }
      })
    }
  })
}

let updateQuestion = function(req, res) {
  db.findByIdAndUpdate(req.params.id,
    {$push : {"question" : req.body.question}},
    {safe: true, upsert: true, new: true},
    function(err, quest) {
      if (err) {
        res.send(err)
      } else {
        res.send(quest)
      }
    }
  )
}

let updateAnswer = function(req, res) {
  db.findByIdAndUpdate(req.params.id,
    {$push : {"answer" : req.body.answer}},
    {safe: true, upsert: true, new: true},
    function(err, answer) {
      if (err) {
        res.send(err)
      } else {
        res.send(answer)
      }
    }
  )
}


module.exports = {
  getAll,
  createUser,
  updateQuestion,
  updateAnswer
}

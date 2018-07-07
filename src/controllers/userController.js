const { User } = require('../models');


exports.createUser = async (req, res) => {
    if (!req) { res.sendStatus(500)}


    console.log('req.body', req.body)
    const { email, password } = req.body;

    if (!email || !password) {
      res.sendStatus(400)
    }
    const newUser = new User({local:{email, password}});

    await newUser.save()
      .catch(err => res.send(err))

    res.send(newUser)
  }

exports.fetchUsers = async (req, res) => {

  const users = User.find({});
  res.send(users)
}


exports.deleteUser = async (req, res) => {
  if(!req) { res.sendStatus(500)}

  const { id } = req.params;

  if(!id) { res.sendStatus(400)}



  User.findOneAndRemove({_id: id})
    .catch(() =>  res.sendStatus(500))
}
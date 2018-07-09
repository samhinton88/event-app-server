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

exports.getUser = async (req, res) => {
  if(!req.body || !req.body.email) { res.sendStatus(400)}

  const { email, password } = req.body;

  const user = await User.findOne({ email })
    .catch(err => res.sendStatus(500));

  if(!user) {
    res.sendStatus(400).send('no resource found for that email address')
  }

  if (password != user.password) {
    res.sendStatus(400).send('incorrect password')
  }

  res.sendStatus(200).send(user);
}

exports.fetchUsers = async (req, res) => {
  console.log('hit fetch users')

  const users = await User.find({});
  res.send(users)
}


exports.deleteUser = async (req, res) => {
  if(!req) { res.sendStatus(500)}

  const { id } = req.params;

  if(!id) { res.sendStatus(400)}



  User.findOneAndRemove({_id: id})
    .catch(() =>  res.sendStatus(500))
}

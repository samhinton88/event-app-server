const { User } = require('../models');
exports.createUser = async (req, res) => {
    if (!req) { res.sendStatus(500)}

    const { email, password } = req.body;

    if (!email || !password) {
      res.send(500)
    }
    const newUser = new User({email, password});

    await newUser.save()
      .catch(err => res.send(err))

    res.send(newUser)
  }

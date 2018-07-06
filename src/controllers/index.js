const { User, Event } = require('../models');

exports.userController = {
  createUser: async (req, res) => {
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
}

  // image: String,
  // title: String,
  // venue: String,
  // time: Date,
  // text: String,
  // interestedUsers: [{type: Schema.Types.ObjectId, ref: 'user'}]

exports.eventController = {
  createEvent: async (req, res) => {
    if (!req) { res.sendStatus(500)}

    rejectIfUndefined(['image', 'title', 'venue', 'time', 'text'], req.body, res)

    const { image, title, venue, time, text } = req.body;

    const newEvent = new Event({ image, title, venue, time, text});

    await newEvent.save()
      .catch(err => res.send(500))

    res.send(newEvent);
  }

  editEvent: async (req, res) => {

  }

  deleteEvent: async (req, res) => {

  }

  fetchEvents: async (req, res) => {

  }
}

const rejectIfUndefined = (props, body, res) => {
  if (props.some((prop) =>  body[prop] === undefined)) { res.send(500)}
}

const sanitzeUserParams = (args) => {
  const { email, password } = args;

  return { email, password }
}

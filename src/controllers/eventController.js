const {  Event } = require('../models');


exports.createEvent = async (req, res) => {
    if (!req) { res.sendStatus(500)}

    rejectIfUndefined(['image', 'title', 'venue', 'time', 'text'], req.body, res)

    const { image, title, venue, time, text } = req.body;

    const newEvent = new Event({ image, title, venue, time, text});

    await newEvent.save()
      .catch(err => res.send(500))

    res.send(newEvent);
  }

exports.editEvent = async (req, res) => {

  }

exports.deleteEvent = async (req, res) => {

  }

exports.fetchEvents = async (req, res) => {
    res.send(Event.find({}))

  }


const rejectIfUndefined = (props, body, res) => {
  if (props.some((prop) =>  body[prop] === undefined)) { res.send(500)}
}

const sanitzeUserParams = (args) => {
  const { email, password } = args;

  return { email, password }
}

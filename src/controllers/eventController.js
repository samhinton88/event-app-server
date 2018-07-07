const {  Event } = require('../models');


exports.createEvent = async (req, res) => {
    if (!req) { res.sendStatus(400)}

    rejectIfUndefined(['image', 'title', 'venue', 'time', 'text'], req.body, res)

    const { image, title, venue, time, text } = req.body;

    const newEvent = new Event({ image, title, venue, time, text});

    await newEvent.save()
      .catch(err => res.send(500))

    res.send(newEvent);
  }

exports.editEvent = async (req, res) => {

  if(!req.body || !req.params.eventId) { res.sendStatus(400) }

  const event = await Event.findOne({_id: req.params.eventId });

  event.set(req.body);
  await event.save();
  res.send(event);
}

exports.deleteEvent = async (req, res) => {

  if(!req.params.eventId) { res.sendStatus(400)}

  await Event.findOneAndRemove({_id: req.params.eventId})
  res.sendStatus(200)

}

exports.fetchEvents = async (req, res) => {
    res.send(Event.find({}))

}


const rejectIfUndefined = (props, body, res) => {
  if (props.some((prop) =>  body[prop] === undefined)) { res.send(400)}
}

const sanitzeUserParams = (args) => {
  const { email, password } = args;

  return { email, password }
}

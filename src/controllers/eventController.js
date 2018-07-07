const {  Event } = require('../models');


exports.createEvent = async (req, res) => {
    if (!req.body) { res.sendStatus(400)}

    console.log(req.body)
    // rejectIfUndefined(['image', 'title', 'venue', 'time', 'text'], req.body, res)

    const { image: img, title, venue, time, text } = req.body;

    console.log('img before buff',img)

    const image = Buffer.from(img, 'base64')

    console.log('image after buff', image)
    const newEvent = new Event({ image, title, venue, time, text});
    try {
      await newEvent.save()
        .catch(err => res.send(500))

      res.status(200).send(newEvent);

    } catch(err) {
      res.sendStatus(500)
    }
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

    const events = await Event.find({});
    res.send(events)

}


const rejectIfUndefined = (props, body, res) => {
  if (props.some((prop) =>  body[prop] === undefined)) { res.send(400)}
}

const sanitzeUserParams = (args) => {
  const { email, password } = args;

  return { email, password }
}

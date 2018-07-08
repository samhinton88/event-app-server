const {  Event } = require('../models');


exports.createEvent = async (req, res) => {
    if (!req.body) { res.sendStatus(400)}


    // rejectIfUndefined(['image', 'title', 'venue', 'time', 'text'], req.body, res)

    const { image: img, title, venue, time, text } = req.body;



    const image = Buffer.from(img.data, 'base64')

    const newEvent = new Event({ title, venue, time, text});

    newEvent.image.data = image;
    newEvent.image.contentType = image.contentType;
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

  console.log(req.body)
  const { image: img, title, venue, time, text } = req.body;
  let image;

  if (img) {
    image = Buffer.from(img.data.data, 'base64')
    event.image.data = image;
    event.image.contentType = image.contentType;
  }

  event.set({ title, venue, time, text});

  try {
    await event.save();
    res.send(event);

  } catch (err) {
    res.sendStatus(500).send(err)
  }
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

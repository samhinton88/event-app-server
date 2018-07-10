const {  Event, User } = require('../models');


exports.createEvent = async (req, res) => {
    if (!req.body) { res.sendStatus(400)}


    // rejectIfUndefined(['image', 'title', 'venue', 'time', 'text'], req.body, res)

    const { cloudinaryUrl, title, venue, time, text } = req.body;

    const newEvent = new Event({ title, venue, time, text, cloudinaryUrl});
    let image;


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
  const { cloudinaryUrl, title, venue, time, text } = req.body;
  let image;

  event.set({ cloudinaryUrl, title, venue, time, text});

  try {
    await event.save();
    res.send(event);

  } catch (err) {
    res.sendStatus(500).send(err)
  }
}

exports.registerInterest = async (req, res) => {
  if(!req.body)  { res.sendStatus(400)}

  const { userId, eventId } = req.body;

  const user = await User.findById(userId)
    .catch(err => res.sendStatus(400).send(err))

  const event = await Event.findById(eventId)
    .catch(err => res.sendStatus(400).send(err))

  event.interestedUsers.push(user);

  await event.save()
    .catch(err => res.send(err));
  res.send(event)
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

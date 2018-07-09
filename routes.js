const { userController, eventController } = require('./src/controllers');

module.exports = app => {
  app.get('/', (req, res) => res.send('Love you baby'))
  app.post('/api/users/', userController.createUser)
  app.get('/api/users', userController.fetchUser)


  app.get('/api/events', eventController.fetchEvents)
  app.post('/api/events', eventController.createEvent)
  app.put('/api/events/:eventId', eventController.editEvent)
  app.delete('/api/events/:eventId', eventController.deleteEvent)
};

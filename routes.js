const { userController, eventController } = require('./src/controllers');

module.exports = app => {
  app.post('/api/users/', userController.createUser)
};

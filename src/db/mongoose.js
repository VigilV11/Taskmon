const mongoose = require('mongoose');
const config = require('../../config');

mongoose.connect(`${config.connectionURL}/${config.databaseName}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

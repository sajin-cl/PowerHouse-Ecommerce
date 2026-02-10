const mongoose = require('mongoose');

function database() {

  const mongoUrl = process.env.MONGODB_URL;

  mongoose.connect(mongoUrl)
    .then(() => console.info('Database connected'))
    .catch(() => console.error('Database Connection Error'));
};

module.exports = database;
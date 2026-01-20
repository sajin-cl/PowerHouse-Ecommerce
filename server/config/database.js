const mongoose = require('mongoose');

function database() {
  mongoose.connect("mongodb://127.0.0.1:27017/PowerHouseEcommerce")
    .then(() => console.info('Database connected'))
    .catch(() => console.error('Database Connection Error'));
};

module.exports = database;
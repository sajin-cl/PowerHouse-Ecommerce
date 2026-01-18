const mongoose = require('mongoose');

function database() {
  mongoose.connect("mongodb://localhost:27017/PowerHouseEcommerce")
    .then(() => console.info('Database created'))
    .catch(() => console.error('Database Connection Error'));
};

module.exports = database;
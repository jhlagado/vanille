const mongoose = require('mongoose');
const Customer = require('../model/customer');

const run = async() => {

  await mongoose.connect('mongodb://localhost:27017/db', { useNewUrlParser: true } );
  await mongoose.connection.dropDatabase();
  mongoose.connection.close();

};

run();

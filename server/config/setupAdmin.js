const  User  = require('../models/auth.model.js');
const bcrypt = require('bcrypt');
const database = require('../config/database.js');


const setupAdmin = async () => {
  await database();

  const existingAdmin = await User.findOne({ role: 'admin' });

  if (existingAdmin) {
    console.log('Admin already exists', existingAdmin.email);
    return
  }

  const admin = new User({
    fullName: 'admin',
    email: 'admin@gmail.com',
    password: await bcrypt.hash('admin', 10),
    role: 'admin'
  });

  await admin.save();

  console.log('admin created successfully');
  process.exit();
};

setupAdmin();
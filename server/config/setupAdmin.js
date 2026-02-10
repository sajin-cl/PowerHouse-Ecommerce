require('dotenv').config();
const User = require('../models/auth.model.js');
const bcrypt = require('bcrypt');
const database = require('../config/database.js');


const setupAdmin = async () => {

  await database();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassWord = process.env.ADMIN_PASSWORD;

  const existingAdmin = await User.findOne({ role: 'admin' });

  if (existingAdmin) {
    console.log('Admin already exists', existingAdmin.email);
    return
  }

  const hashedPwd = await bcrypt.hash(adminPassWord, 10);

  const admin = new User({
    fullName: 'admin',
    email: adminEmail,
    password: hashedPwd,
    role: 'admin'
  });

  await admin.save();

  console.log('admin created successfully');
  process.exit();
};

setupAdmin();
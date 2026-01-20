const bcrypt = require('bcrypt');
const { User } = require('../models/auth.model.js');


exports.register = async (req, res) => {
  try {

    const { user, email, password, confirmPassword, role, shopName } = req.body;

    if (!user || !email || !password || !confirmPassword) return res.status(400).json({ error: 'all fields are required' });
    if (password !== confirmPassword) return res.status(400).json({ error: 'Password mismatched' });
    if (role === 'seller' && !shopName) return res.status(400).json({ error: 'Shop name is required for sellers' });

    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ error: 'Email is already registered' });

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      user,
      email,
      password: hashedPwd,
      role: role || 'user',
      shopName: role === 'seller' ? shopName : undefined
    });

    res.status(201).json({ message: 'User registered successfully', newUser })

  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
};
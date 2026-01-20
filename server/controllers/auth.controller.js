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


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid user or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid user or password' });

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

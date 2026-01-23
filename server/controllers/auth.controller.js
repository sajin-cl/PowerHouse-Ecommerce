const bcrypt = require('bcrypt');
const User = require('../models/auth.model.js');
const validator = require('validator');


exports.register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, role, shopName } = req.body;

    if (!fullName || !email || !password || !confirmPassword) return res.status(400).json({ error: 'all fields are required' });
    if (password !== confirmPassword) return res.status(400).json({ error: 'Password mismatched' });
    if (role === 'seller' && !shopName) return res.status(400).json({ error: 'Shop name is required for sellers' });

    const existingUser = await User.findOne({ email });

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    if (existingUser) return res.status(400).json({ error: 'Email is already registered' });

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
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

    if (user.isBlocked) {
      return res.status(403).json({ error: 'Access Denied' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid user or password' });

    req.session.userData = user._id;

    return res.json({
      success: true,
      role: user.role,
      message: 'Login successful'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.checkSession = (req, res) => {
  try {
    if (!req.session || !req.session.userData) {
      return res.status(401).json({
        loggedIn: false,
        message: 'Your session has expired. Please login again.'
      })
    }
    res.json({ loggedIn: true, message: 'session active' });
  }
  catch (err) {
    console.error("Check session error:", err);
    res.status(500).json({ error: "Server error checking session" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('logout failed');
      return res.status(500).json({ error: 'logout failed' })
    }

    res.json({ success: true, message: 'logout successfully' });
  });

};

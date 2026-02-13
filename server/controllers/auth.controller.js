const bcrypt = require('bcrypt');
const User = require('../models/auth.model.js');
const validator = require('validator');
const nodemailer = require('nodemailer');
const { forgotPasswordTemplate } = require('../utils/emailTemplates/forgotPasswordTemplate.js');


exports.register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, role, shopName, shopAddress } = req.body;

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
      shopName: role === 'seller' ? shopName : undefined,
      shopAddress: role === 'seller' ? shopAddress : undefined
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

    req.session.userData = {
      id: user._id,
      role: user.role
    }

    return res.json({
      success: true,
      role: user.role,
      id: user._id,
      message: 'Login successful'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.checkSession = (req, res) => {


  if (!req.session || !req.session?.userData) {
    return res.status(401).json({
      loggedIn: false,
      message: 'Your session has expired. Please login again!'
    })
  }

   const { id, role } = req.session.userData;


  res.json({
    loggedIn: true, message: 'session is still active',
    user: { id, role }
  });


};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('logout failed');
      return res.status(500).json({ error: 'logout failed' })
    }
    res.status(200).json({ success: true, message: 'logout successfully' });
  });

};


//Forgot password 
exports.forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) res.status(404).json({ error: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.resetOTPExpires = Date.now() + 10 * 60 * 1000 //10minnutes
    await user.save();


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }

    });

    const mailOptions = {
      from: `"Power House Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset OTP',
      html: forgotPasswordTemplate(user.fullName, otp)
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent on your email!" });

  }
  catch (err) {
    if (err.code === 'ENOTFOUND' || err.syscall === 'getaddrinfo') {
      return res.status(503).json({
        error: 'Network error! Please check your internet connection and try again.'
      });
    }
    res.status(500).json({ error: err.message || 'Something went wrong. Please try again later.' });
  }
};


exports.verifyOtp = async (req, res) => {
  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) res.status(404).json({ error: 'User not found' });

    if (user.resetOtp !== otp) return res.status(400).json({ error: 'Invalid OTP! Check again.' });
    if (Date.now() > user.resetOTPExpires) return res.status(400).json({ error: 'OTP Expired! Send a new one.' });

    res.status(200).json({ message: "OTP Verified! Now set your new password." });

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Something went wrong. Please try again later.' });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Email and Password are required' });
    if (password.length < 5) return res.status(400).json({ error: 'Password must be at least 5 characters' });

    const user = await User.findOne({ email });
    if (!user) res.status(404).json({ error: 'User not found' });

    const hashedPwd = await bcrypt.hash(password, 10);
    user.password = hashedPwd;

    user.resetOTPExpires = undefined;
    user.resetOtp = undefined;

    await user.save();
    res.status(200).json({ message: 'Password reset successful. You can now login.' });

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'password reset failed,try again later!' });
  }
};
function adminAuth(req, res, next) {

  if (!req.session || !req.session.userData) {
    return res.status(401).json({ error: 'Please loggedin your account!' });
  }

  if (req.session.userData.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin only.' });
  }

  next();
};

module.exports = adminAuth;
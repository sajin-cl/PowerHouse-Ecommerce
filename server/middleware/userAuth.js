function userAuth(req, res, next) {

  if (!req.session || !req.session.userData) {
    return res.status(401).json({ error: 'Please loggedin your account!' });
  }

  if (req.session.userData.role !== 'user') {
    return res.status(403).json({ error: 'Access denied. user only.' });
  }

  next();
};

module.exports = userAuth;

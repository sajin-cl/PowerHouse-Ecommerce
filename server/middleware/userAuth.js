function userAuth(req, res, next) {

  if (!req.session || !req.session.userData) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  if (req.session.userData.role !== 'user') {
    return res.status(403).json({ error: 'Access denied. user only.' });
  }

  next();
};

export default userAuth;
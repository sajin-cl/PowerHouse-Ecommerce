function sellerAuth(req, res, next) {
  
  if (!req.session || !req.session.userData) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  if (req.session.userData.role !== 'seller') {
    return res.status(403).json({ error: 'Access denied. Seller only.' });
  }

  next();
};

module.exports = sellerAuth;
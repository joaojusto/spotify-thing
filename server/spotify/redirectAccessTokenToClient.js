const CLIENT_BASE = 'http://localhost:3000';

const url = accessToken => `${CLIENT_BASE}?access_token=${accessToken}`;

const redirectAccessTokenToClient = (req, res) => {
  res.redirect(url(req.accessToken));
};

module.exports = redirectAccessTokenToClient;

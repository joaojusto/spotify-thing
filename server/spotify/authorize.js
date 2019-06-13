const credentials = require('./credentials');

const { client_id } = credentials;
const redirect_uri = encodeURI(credentials.redirect_uri);

const base = 'https://accounts.spotify.com/authorize';

const scopes = 'user-read-playback-state';

const url = `${base}?&client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scopes}`;

const authorize = (req, res) => {
  res.redirect(url);
};

module.exports = authorize;

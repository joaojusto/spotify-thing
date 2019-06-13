const fetch = require('node-fetch');

const credentials = require('./credentials');

const { client_id, redirect_uri, client_secret } = credentials;

const url = 'https://accounts.spotify.com/api/token';
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};
const defaultData = {
  client_id,
  redirect_uri,
  client_secret,
  grant_type: 'authorization_code'
};

const getBodyFromData = data => {
  const searchParams = new URLSearchParams();

  Object.keys(data).forEach(prop => {
    searchParams.set(prop, data[prop]);
  });

  return searchParams;
};

const getAccessToken = (req, res, next) => {
  const { code } = req.query;

  if (!code) return;

  const body = getBodyFromData({ code, ...defaultData });

  fetch(url, { method: 'POST', headers, body })
    .then(response => response.json())
    .then(({ access_token }) => {
      req.accessToken = access_token;
      next();
    })
    .catch(next);
};

module.exports = getAccessToken;

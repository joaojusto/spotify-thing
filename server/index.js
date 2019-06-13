const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const authorize = require('./spotify/authorize.js');
const getAccessToken = require('./spotify/getAccessToken.js');
const redirectAccessTokenToClient = require('./spotify/redirectAccessTokenToClient.js');

const PORT = 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', authorize);
app.get('/callback', getAccessToken, redirectAccessTokenToClient);

const server = app.listen(PORT, () => {
  console.log(
    `Server up and running at http://localhost:${server.address().port}`
  );
});

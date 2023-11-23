require('dotenv').config();

const express = require('express');
const querystring = require('querystring');
const request = require('request');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mysql = require('mysql');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

const app = express();
app.use(cookieParser());
app.use(cors());

// Connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quizz_spotify',
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connexion à la base de données réussie !');
  }
});

const generateRandomString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Spotify API!' });
});

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email';

  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    })}`
  );
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
  } else {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        res.cookie('access_token', access_token, { httpOnly: true });
        res.cookie('refresh_token', refresh_token, { httpOnly: true });

        res.send({ access_token: access_token, refresh_token: refresh_token });
      } else {
        res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
      }
    });
  }
});

app.get('/profile', (req, res) => {
  const access_token = req.cookies.access_token;

  const options = {
    url: 'https://api.spotify.com/v1/me',
    headers: { Authorization: `Bearer ${access_token}` },
    json: true,
  };

  request.get(options, (error, response, body) => {
    res.send(body);
  });
});

app.get('/tracks', (req, res) => {
  const access_token = req.cookies.access_token;

  const options = {
    url: 'https://api.spotify.com/v1/tracks/4WCgX7CXrUp9VjjVQXkxZR',
    headers: { Authorization: `Bearer ${access_token}` },
    json: true,
  };

  request.get(options, (error, response, body) => {
    res.send(body);
  });
});

app.get('/top_tracks', (req, res) => {
  const access_token = req.cookies.access_token;

  const options = {
    url: 'https://api.spotify.com/v1/me/top/tracks',
    headers: { Authorization: `Bearer ${access_token}` },
    json: true,
  };

  request.get(options, (error, response, body) => {
    res.send(body);
  });
});

app.get('/data', (req, res) => {
  connection.query('SELECT * FROM thematique', (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données depuis la base de données :', error);
      res.status(500).send('Erreur lors de la récupération des données');
    } else {
      res.send(results);
    }
  });
});

const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

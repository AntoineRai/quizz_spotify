require('dotenv').config();

const express = require('express');
const querystring = require('querystring');
const request = require('request');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const thematicModel = require('./models/Thematic');
const mongoDB = require('./utils/mongoDB');
const thematicRoute = require('./routes/thematicRoute');
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

const app = require('./startApp');

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

app.get('/profil', (req, res) => {
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

// Send back a playlist from it's id
app.get('/tracks/:playlistId', (req, res) => {
  const access_token = req.cookies.access_token;
  const playlist_id = req.params.playlistId;

  const options = {
    url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    headers: { Authorization: `Bearer ${access_token}` },
    json: true,
  };

  request.get(options, (error, response, playlistTracks) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).send('Internal Server Error: Failed to get playlist tracks');
    }

    // Select the revelant information
    var simplifiedTracks = playlistTracks.items.map(function(item) {
      var track = item.track;
      return {
        title: track.name,
        author: track.artists[0].name,
        preview_url: track.preview_url
      };
    });

    console.log(simplifiedTracks);

    // Sending back the whole data (change it to simplifieldTracks to get the sorted version)
    res.send(playlistTracks.items);
  });
});

// URL example:  http://localhost:8888/tracks/{Id}


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

app.post('/addThematic', async (req, res) => {
  console.log(req.body);
  try {
    const { idThematic, nom, url } = req.body;
    console.log(req.body)
    console.log(nom)
    console.log(url)

    if (!idThematic || !nom || !url) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const thematic = new thematicModel({
      idThematic,
      nom,
      url
    });

    const savedThematic = await thematic.save();

    res.status(200).json(savedThematic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/getThematics', async (req, res) => {
  try {
      const data = await thematicModel.find();
      res.json(data)
  }
  catch (error) {
      res.status(500).json({ message: error.message })
  }
})

const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
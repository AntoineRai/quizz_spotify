// app.js
require('dotenv').config();
const express = require('express');
const startApp = require('./startApp');
const thematicRoute = require('./routes/thematicRoute');
const spotifyRoute = require('./routes/spotifyRoute');
const mongoDB = require('./utils/mongoDB');

const PORT = 8888;
const app = express();

// Use the middleware setup from startApp.js
app.use(startApp);

// Use thematic route
app.use('/thematic', thematicRoute);

// Use Spotify route
app.use('/spotify', spotifyRoute);

// Other routes can be added similarly...

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

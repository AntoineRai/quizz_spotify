require('dotenv').config();

var express = require("express");
var querystring = require("querystring");
const request = require("request");

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = process.env.REDIRECT_URI;

var app = express();

//Generate a random string containing numbers and letters
const generateRandomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

app.get("/", function (req, res) {
  res.send({"message":"Welcome to the Spotify API!"});
}); 

//Routes for the login to Spotify
app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  var scope = "user-read-private user-read-email";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

//Routes for the callback
app.get("/callback", function (req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;
  
    if (state === null) {
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "state_mismatch",
          })
      );
    } else {
      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            new Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        json: true,
      };
  
      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token;
          var refresh_token = body.refresh_token;
  
          // You can use the access_token and refresh_token here as needed
          // For example, you can redirect the user to a new page or send a response with the tokens
          res.send({ access_token: access_token, refresh_token: refresh_token });
        } else {
          res.redirect(
            "/#" +
              querystring.stringify({
                error: "invalid_token",
              })
          );
        }
      });
    }
  });

app.listen(8888, function () {
  console.log("Server listening on http://localhost:8888");
});
// const dotenv = require('dotenv');

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


export default function handler(req, res) {

  console.log("LOGGER: inside API - /auth/login")
  var state = generateRandomString(16);

  var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
  var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
  var spotify_redirect_uri = "http://localhost:3000/api/auth/callback"

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: "streaming user-read-email user-read-private",
    redirect_uri: spotify_redirect_uri,
    state: state
  })

  console.log("spotify_client_id: " + spotify_client_id);
  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
}
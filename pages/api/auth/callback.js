const request = require('request');
var access_token = ""

export default function handler(req, res) {

  console.log("LOGGER: inside API - /auth/callback")

  var code = req.query.code;
  console.log("authorization code: " + code);
  console.log("state: " + req.query.state);

  var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
  var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
  var spotify_redirect_uri = "http://localhost:3000/api/auth/callback"

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      console.log("refresh_token: " + body.refresh_token);
      console.log("access_token: " + access_token);
      console.log("LOGGER: inside API - /auth/callback, redirecting back to /")

      res.redirect('/')
    }
  });
}

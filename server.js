//Install express server
const express = require('express');
const app = express();
var ClientOAuth2 = require('client-oauth2')
var storeNewToken

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

var githubAuth = new ClientOAuth2({
  clientId: '737377749098-dsrh0v2q4t20a4i4ncujaudmeu6jt9cs.apps.googleusercontent.com',
  clientSecret: 'oa7tB-k29Vs21yhpw0HzQebJ',
  accessTokenUri: 'https://accounts.google.com/o/oauth2/token',
  authorizationUri: 'https://accounts.google.com/o/oauth2/auth',
  redirectUri: 'https://developers.google.com/oauth2callback',
  scopes: 'https://www.googleapis.com/auth/userlocation.beacon.registry'
})

// Can also just pass the raw `data` object in place of an argument.
var token = githubAuth.createToken('access token', 'optional refresh token', 'optional token type', { data: 'raw user data' })
 
// Set the token TTL.
token.expiresIn(1234) // Seconds.
token.expiresIn(new Date('2018-05-25')) // Date.
 
// Refresh the users credentials and save the new access token and info.
token.refresh().then(storeNewToken)
 
// Sign a standard HTTP request object, updating the URL with the access token
// or adding authorization headers, depending on token type.
token.sign({
  method: 'get',
  url: 'https://accounts.google.com/o/oauth2/token'
}) //=> { method, url,




// window.oauth2Callback = function (uri) {
//   githubAuth.token.getToken(uri)
//     .then(function (user) {
//       console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }
 
//       // Make a request to the github API for the current user.
//       return popsicle.request(user.sign({
//         method: 'get',
//         url: 'https://accounts.google.com/o/oauth2/token'
//       })).then(function (res) {
//         console.log(res) //=> { body: { ... }, status: 200, headers: { ... } }
//       })
//     })
// }
 
// Open the page in a new window, then redirect back to a page that calls our global `oauth2Callback` function.
//window.open(githubAuth.token.getUri())


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3030);



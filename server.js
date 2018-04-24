//Install express server
const express = require('express');
const app = express();
var KontaktApi = require('kontakt-node');
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

var kontaktApi = new KontaktApi('uJwttohXdGxvyKqeLSHblcpiqmkPKpKp');

kontaktApi.beaconCredentials({beaconId: ' https://api.kontakt.io/device'},
function (err, res) {
  console.log(res);
});






// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3030);



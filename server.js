//Install express server
const express = require('express');
const app = express();
var KontaktApi = require('kontakt-node');
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

var kontaktApi = new KontaktApi('uJwttohXdGxvyKqeLSHblcpiqmkPKpKp');


var request = require('request');

//set up the users API key
function KontaktApi(key) {
  this.key = key !== null ? key : null;
  //this.beacon_endpoint = 'beacon/'; //temp deprecated resource
  this.device_endpoint = 'device/';
  this.base_url = 'https://api.kontakt.io/';
  var self = this instanceof KontaktApi ? this : Object.create(KontaktApi.prototype);
}

app.get("/getdevice" ,function(res, req) {
//get device
KontaktApi.prototype.getDevice = function(resource, callback) {
  var beaconId, endpoint, managerId, credentials, contact, options, byUnique, proximity,
  major, minor; //TODO clean this up

  var p = resource;

  if (resource !== null) {
    options = { uri: p,
      json: true,
      headers: {
        'Accept' : 'application/vnd.com.kontakt+json; version=9',
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Api-Key': 'uJwttohXdGxvyKqeLSHblcpiqmkPKpKp'
      }
    };
  } else {
    callback(null, 'Invalid Setting');
  }

  contact = request.get(options, function (error, response, object) {
    if (error) { return callback(error); }
    if (response.statusCode != 200 ) {
      return callback(response.statusCode);
    }
    callback(null, object);
  });

};

});
/**
* lists all devices
*/
KontaktApi.prototype.device = function (params, callback) {
    var path = this.base_url + this.device_endpoint;
    if (arguments.length === 1) {
      var cb = params;
      return this.getDevice(path, cb);
    }
    if ((params !== null) && typeof params === 'object') {
      return this.getDevice(path, callback);
    } else {
      callback(null, 'Invalid Setting: please provide an object');
    }
};

KontaktApi.prototype.deviceById = function (params, callback) {
  if ((params !== null) && typeof params === 'object') {
    if (Array.isArray(params.uniqueId) === false) {
      var path = this.base_url + '/' + this.device_endpoint + params.uniqueId;
      return this.getDevice(path, callback);
    } else {
      callback(null, 'ERROR: only request one beacon at a time');
    }
  } else {
    callback(null, 'Invalid Setting: please provide an object');
  }
};

/**
* /beacon by proximity
*/
KontaktApi.prototype.beaconByProximity = function (params, callback) {
  if ((params !== null) && typeof params === 'object') {
    var path = this.base_url + this.beacon_endpoint + params.proximity +'/' + params.major + '/' + params.minor;
    return this.getDevice(path, callback);
  } else {
    callback(null, 'Invalid Setting: please provide an object');
  }
};

/**
* /beacon by credentials
*/
KontaktApi.prototype.beaconCredentials = function (params, callback) {
  if ((params !== null) && typeof params === 'object') {

    if (Array.isArray(params.beaconId) === false) {
      var path = this.base_url + '/' + this.beacon_endpoint + params.beaconId + '/credentials';
      return this.getDevice(path, callback);
    } else {
      callback(null, 'ERROR: only request one beacon at a time');
    }
  } else {
    callback(null, 'Invalid Setting: please provide an object');
  }
};

KontaktApi.prototype.unassigned = function (params, callback) {
  if ((params !== null) && typeof params === 'object') {
    var path = this.base_url + this.beacon_endpoint + 'unassigned/'+ params.managerId;
    return this.getDevice(path, callback);
  } else {
    callback(null, 'Invalid Setting: please provide an object');
  }
};

//export the module
module.exports = KontaktApi;





// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3030);



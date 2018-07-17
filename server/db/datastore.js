const Datastore = require('@google-cloud/datastore');

// For explicit authentication using key file...
const ds = new Datastore({keyFilename: './sandbox/ddb-key.json'});
//For implicit authentication (e.g. Google AppEngine)
//const ds = new Datastore();

const gs = require('gstore-node')();
gs.connect(ds);

module.exports = {gs};

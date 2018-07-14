const Datastore = require('@google-cloud/datastore');
const ds = new Datastore({keyFilename: './sandbox/ddb-key.json'});

const gs = require('gstore-node')();
gs.connect(ds);

module.exports = {gs};

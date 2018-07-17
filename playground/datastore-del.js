const Datastore = require('@google-cloud/datastore');

// For explicit authentication using key file...
const ds = new Datastore({keyFilename: './ddb-key.json'});
//For implicit authentication (e.g. Google AppEngine)
//const ds = new Datastore();

// var todoId = 5639445604728832
var todoId = 5636953047302144
const todoKey = ds.key(['Todos', todoId]);

ds
  .delete(todoKey)
  .then((data) => {
    if (data.indexUpdates > 0) {
      console.log('Deleted ', todoId);
    } else {
      console.log('Unable to delete ', todoId);
    }
  })
  .catch((err) => {
    console.Error('Error: ', err)
  });

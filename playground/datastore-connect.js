const Datastore = require('@google-cloud/datastore');

// For explicit authentication using key file...
const ds = new Datastore({keyFilename: './sandbox/ddb-key.json'});
//For implicit authentication (e.g. Google AppEngine)
//const ds = new Datastore();


const taskKey = ds.key('Todos');
const entity = {
  key: taskKey,
  data: [
    {name: 'text', value: 'Buy milk', excludeFromIndexes: true},
    {name: 'completed', value: true}
  ]
};

ds
  .save(entity)
  .then(() => {
    console.log(`Created To do ${taskKey.id} successfully`);
    console.log(JSON.stringify(entity, undefined, 2));
  })
  .catch((err) => {
    console.error('ERROR: ', err);
  });
  //
  // const userKey = ds.key('Users');
  // const entityUser = {
  //   key: userKey,
  //   data: [
  //     {name: 'name', value: 'Lavan'},
  //     {name: 'age', value: 30},
  //     {name: 'location', value: 'Naperville'}
  //   ]
  // };
  //
  // ds
  //   .save(entityUser)
  //   .then(() => {
  //     console.log('Created user ');
  //     console.log(JSON.stringify(entityUser, undefined, 2));
  //   })
  //   .catch((err) => {
  //     console.error('ERROR: ', err);
  //   });

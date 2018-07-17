const Datastore = require('@google-cloud/datastore');

// For explicit authentication using key file...
const ds = new Datastore({keyFilename: './ddb-key.json'});
//For implicit authentication (e.g. Google AppEngine)
//const ds = new Datastore();

const tx = ds.transaction();

var todoId = 5639445604728832
const todoKey = ds.key(['Todos', todoId]);

tx
  .run()
  .then(() => {
    tx.get(todoKey)
      .then((results) => {
          console.log(results);
          var todoItem = results[0];

          todoItem.completed = true;
          tx.save({
            key: todoKey,
            data: todoItem
          });
          console.log('Saving changes ', todoItem);
          return tx.commit();
      })
  })
  .catch(() => {
    tx.rollback();
  });

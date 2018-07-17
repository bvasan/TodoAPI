const Datastore = require('@google-cloud/datastore');

// For explicit authentication using key file...
const ds = new Datastore({keyFilename: './ddb-key.json'});
//For implicit authentication (e.g. Google AppEngine)
//const ds = new Datastore();

var todoId = 5639445604728832
// var todoId = 5636953047302144
const todoKey = ds.key(['Todos', todoId]);
const query = ds
                .createQuery('Todos')
                .filter('__key__', todoKey);
ds
  .runQuery(query)
  .then((results) => {
    var todoList = results[0];
    console.log('Todo List: ');
    if (todoList.length > 0) {
      todoList.forEach((todoItem) => {
        console.log(todoItem[ds.KEY].id, todoItem.completed, todoItem.text);
      });
    } else {
      console.log('Unable to find item ', todoId);
    }

  })
  .catch((err) => {
    console.error('ERROR: ', err);
  });


//
// const query = ds
//                 .createQuery('Users')
//                 .filter('location', 'Chicago');
// ds
//   .runQuery(query)
//   .then((results) => {
//     var todoList = results[0];
//     console.log('Todo List: ');
//
//     todoList.forEach((todoItem) => {
//       console.log(todoItem);
//     });
//
//   })
//   .catch((err) => {
//     console.error('Erorr: ', err);
//   });

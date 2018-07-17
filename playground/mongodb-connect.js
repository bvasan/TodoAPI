// const mc = require('mongodb').MongoClient;
// Local mongodb server
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', {
  useNewUrlParser: true
}, (err, client) => {
  if (err) {
    return console.log('Unable to connect to DB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  db.collection('Todos').insertOne({
    text: 'Pay Amex card',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.collection('Users').insertOne({
    name: 'kaush',
    age: 25,
    location: 'Chicago'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert docuemnt to Users', err);
    }
    console.log(result.ops[0]._id.getTimestamp());
  });

  client.close();
});

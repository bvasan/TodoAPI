var {gs} = require('./../server/db/datastore');
var {User} = require('./../server/models/user');
var {Todo} = require('./../server/models/todo');

var id = '5153603132063744';

Todo.get(id).then((entity) => {
  if (!entity) {
    return console.log('ID not found');
  }
  console.log('Todo by Id ',JSON.stringify(entity.plain()));
}).catch((e) => console.log(e));
//
// Todo.findOne({ id: id}).then((entity) => {
//   console.log(entity.plain());
// });
var id = '5633226290757632'
User.get(id).then((entity) => {
  if (!entity) {
    return console.log('User not found');
  }
  console.log('User by Id ',JSON.stringify(entity.plain()));
}).catch((e) => console.log(e));

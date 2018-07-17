var express = require('express');
var bodyParser = require('body-parser');

var {gs} = require('./db/datastore');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

const port = 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
  Todo.list()
    .then((todos) => {
      res.send({todos});
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  Todo.get(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    };
    res.send(todo.plain());

  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
    console.log(`started on port ${port}`);
});

module.exports = {app};

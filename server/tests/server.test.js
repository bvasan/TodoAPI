const expect = require('expect');
const request = require('supertest');
const gstore = require('gstore-node')();

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

var todos = [];
var todo = new Todo({
  text: 'First test todo'
});
todos.push(todo);

var todo = new Todo({
  text: 'Second test todo'
});
todos.push(todo);

beforeEach((done) => {
  Todo.deleteAll().then(() => {
    return gstore.save(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo item', (done) => {
    var text = 'Test todo text from Mocha -updated2';
    const options = {
      filters : ['text','=',text]
    }
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.entityData.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        };
        Todo.list(options).then((todos) => {
          expect(todos.entities.length).toBe(1);
          expect(todos.entities[0].text).toBe(text);
          done()
        }).catch((e) => {
          return done(e);
        })
      });
  });

  it('should not create a todo with invalid body', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.list().then((todos) => {
          expect(todos.entities.length).toBe(2);
          done();
        }).catch((e) => {
          return done(e);
        });
      })
  });

});

describe('GET /todos ', () => {
  it('should get all todos', (done) => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.entities.length).toBe(2);
      })
      .end(done);
  });
})

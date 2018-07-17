const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.deleteAll().then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo item', (done) => {
    var text = 'Test todo text from Mocha -updated2';

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
        Todo.list().then((todos) => {
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
          expect(todos.entities.length).toBe(0);
          done();
        }).catch((e) => {
          return done(e);
        });
      })
  });

});

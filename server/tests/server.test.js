const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: "My first todo",
}, {
    _id: new ObjectID(),
    text: "My second todo",
    completedAt: 3333,
    completed: true
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err)
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();

                }).catch((e) => done(e));
            })
    })
    it('should not create a todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            })
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2)
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should get a single todo', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done);
    });

    it('should return 404 if todo is not found', (done) => {
        var hex = new ObjectID().toHexString()
        request(app)
        .get(`/todos/${hex}`)
        .expect(404)
        .end(done);
    })
    

    it('should return 404 for non-object ids', (done) => {
        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done);
    })
    
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect ((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if(err) {
                return done(err)
            }
            Todo.findById(hexId).then((todo) => {
                expect(todo).toBeFalsy();
                done();
            }).catch((e) => done(e));
        });
    });

    it('should return 404 if todo not found', (done) => {
        var hex = new ObjectID().toHexString()
        request(app)
        .delete(`/todos/${hex}`)
        .expect(404)
        .end(done);

    });

    it('should return a 404 if object id is invalid', (done) => {
        request(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done);
    });
})

describe('PATCH /todos/:id', () => {
    it('should update a todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'this is my updated test todo'
        var completed = true
        request(app)
        .patch(`/todos/${hexId}`)
        .send({text, completed})
        .expect(200)
        .expect ((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if(err) {
                return done(err)
            }
            Todo.findById(hexId).then((todo) => {
                expect(todo.completed).toBe(true);
                expect(todo.text).toBe(text);
                expect(todo.completedAt).toBeGreaterThan(0)
                done();
            }).catch((e) => done(e));
        });
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var completed = false
        request(app)
        .patch(`/todos/${hexId}`)
        .send({completed})
        .expect(200)
        .expect ((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if(err) {
                return done(err)
            }
            Todo.findById(hexId).then((todo) => {
                expect(todo.completed).toBe(false);
                expect(todo.completedAt).toBeNull();
                done();
            }).catch((e) => done(e));
        });
    });

    it('should return 404 if todo not found', (done) => {
        var hex = new ObjectID().toHexString()
        request(app)
        .patch(`/todos/${hex}`)
        .expect(404)
        .end(done);

    });

    it('should return a 404 if object id is invalid', (done) => {
        request(app)
        .patch(`/todos/123`)
        .expect(404)
        .end(done);
    });
})
/**
 * Created by csche on 19.07.2017.
 */
const expect = require("expect");
const request = require("supertest");
const {ObjectID} = require("mongodb");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

const todos = [{
    _id: new ObjectID(),
    text: "First test todo"
},{
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(()=> done());
});


describe("POST /todos", () => {
    it("should create a new todo", (done) => {
        let text = "Test todo text";
        request(app)
            .post("/todos")
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err){
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    it("should not create todo with invalid body data", (done) => {
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err){
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe("GET /todos", () => {
    it("should get all todos", (done) => {
        request(app)
            .get("/todos")
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe("GET /todos/:id", () => {
    it("Should return todo doc", (done) => {
        request(app)
        // get id from mongodb and extract from object to HexString
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it("should return 404 if todo not found", (done) => {
    // use new Object ID hex to string
        var hexID = new ObjectID().toHexString();
        request(app)
        // grab entry from db with id from res
            .get(`/todos/${hexID}`)
            .expect(404)
            .end(done);
    });

    it("should return 404 for non object ids", (done) => {
        request(app)
            .get("/todos/123")
            .expect(404)
            .expect((res) => {
                expect(res.body.todo).toBe(undefined);
            })
            .end(done);
    });
});

describe("DELETE /todos/:id", () => {
    it ("remove a todo", (done) => {
        let hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                //query database find by id toNotExist
                Todo.findById(hexId).then((res) => {
                    expect(res).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });

    it("should return 404 if todo not found", (done) => {
        let hexID = new ObjectID().toHexString();
        request(app)
        // grab entry from db with id from res
            .delete(`/todos/${hexID}`)
            .expect(404)
            .end(done);
    });

    it("should return 404 if object id is invalid", (done) => {
        request(app)
            .delete("/todos/123")
            .expect(404)
            .end(done);
    });
});

describe("PATCH /todos/:id", () => {
    it("should update the todo", (done) => {
        let hexId = todos[0]._id.toHexString();
        let text = "This is the new text";

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA("number");
            })
            .end(done);
        // grab id of first item
        // update the text set completed = true
        // 200
        // res.body text change, completedAt is a no .toBeA

    });

    it("should clear completedAt when todo is not completed", (done) => {
        let hexId = todos[1]._id.toHexString();
        let text = "This is the other new text";

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
        // grab id of second todo item
        // update text, set completed to false
        // 200
        // text is changed compelted fales, completedAt is null .toNotExist

    });


});
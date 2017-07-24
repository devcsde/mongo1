"use strict";

/**
 * Created by csche on 19.07.2017.
 */
require("./config/config");

var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");

var _require = require("mongodb"),
    ObjectID = _require.ObjectID;

var _require2 = require("./db/mongoose"),
    mongoose = _require2.mongoose;

var _require3 = require("./models/todo"),
    Todo = _require3.Todo;

var _require4 = require("./models/user"),
    User = _require4.User;

var _require5 = require("./middleware/authenticate"),
    authenticate = _require5.authenticate;

var app = express();

var port = process.env.PORT;

app.use(bodyParser.json());

app.post("/todos", function (req, res) {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then(function (doc) {
        res.send(doc);
    }, function (e) {
        res.status(400).send(e);
    });
});

app.get("/todos", function (req, res) {
    Todo.find().then(function (todos) {
        res.send({ todos: todos });
    }, function (e) {
        res.status(400).send(e);
    });
});

app.get("/todos/:id", function (req, res) {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then(function (todo) {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({ todo: todo });
    }).catch(function (e) {
        res.status(400).send(e);
    });
});

app.delete("/todos/:id", function (req, res) {
    // get the ID
    var id = req.params.id;
    // validate the ID --> not valid 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then(function (todo) {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({ todo: todo });
    }).catch(function (e) {
        res.status(400).send(e);
    });
});

app.patch("/todos/:id", function (req, res) {
    var id = req.params.id;
    //  lodash pick out text/completed, if it exists and assign to body
    // now only these can be accessed
    var body = _.pick(req.body, ["text", "completed"]);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then(function (todo) {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo: todo });
    }).catch(function (e) {
        res.status(400).send(e);
    });
});

// POST /users
app.post("/users", function (req, res) {
    var body = _.pick(req.body, ["email", "password"]);
    var user = new User(body);

    user.save().then(function () {
        return user.generateAuthToken();
    }).then(function (token) {
        res.header("x-auth", token).send(user);
    }).catch(function (e) {
        res.status(400).send(e);
    });
});

app.get("/users/me", authenticate, function (req, res) {
    res.send(req.user);
});

app.listen(port, function () {
    console.log("Started up at port " + port);
});

module.exports = { app: app };
//# sourceMappingURL=server.js.map
/**
 * Created by csche on 19.07.2017.
 */
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp", {
    useMongoClient: true,
    /* other options */
});

let Todo = mongoose.model("Todos", {
    text: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// let newTodo = new Todo({
//     text: "Cook dinner"
// });
//
// newTodo.save().then((res) => {
//     console.log("Saved todo", res)
// }, (e) => {
//     console.log('Unable to save todo', e);
// });

// let note1 = new Todo({
//     text: "Something to do",
//     completed: true
// });
//
// note1.save().then((res) => {
//     console.log(JSON.stringify(res, undefined, 2));
// }, (e) => {
//     console.log('Unable to save todo', e);
// });

// User
// email - require - trim - set type - set min length of 1

let User = mongoose.model("Users", {
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

// let user1 = new User({
//     firstName: "Chris",
//     email: "mail@mil.de"
// });
//
// user1.save().then((res) => {
//    console.log(JSON.stringify(res, undefined, 2));
// });

let user2 = new User({
    firstName: "Tom",
    lastName: "Kruger"
});

user2.save().then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
});
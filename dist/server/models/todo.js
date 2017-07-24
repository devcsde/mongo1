"use strict";

/**
 * Created by csche on 19.07.2017.
 */
var mongoose = require("mongoose");

var Todo = mongoose.model("Todos", {
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

module.exports = { Todo: Todo };

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
//# sourceMappingURL=todo.js.map
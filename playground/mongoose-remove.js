/**
 * Created by csche on 20.07.2017.
 */
const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");


// // remove everything
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// remove one
// Todo.findOneAndRemove({_id: "5972318ca336dcf071194fc2"}).then((todo) => {
//     console.log(todo);
// });
// Todo.findByIdAndRemove

Todo.findByIdAndRemove("5972318ca336dcf071194fc2").then((todo) => {
    console.log(todo);
});
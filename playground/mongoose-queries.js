/**
 * Created by csche on 20.07.2017.
 */
const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");


// query Users by ID
let id = "596ea2c731dcb830c42b0c7e";

// query works, but no user
// query works and was found
// catch other errors

if (ObjectID.isValid(id)){
    User.findById(id).then((user) => {
        if (!user){
            return console.log("There is no User with this ID");
        } else{
            console.log(user);
        }
    }).catch((e) => console.log(e));
} else {
    console.log("ID not valid");
}


// let id = "596fdf317f975531d8e46319";
//
// if (!ObjectID.isValid(id)){
//     console.log("ID not valid");
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log("Todos", todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log("Todo", todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo){
//         console.log("ID not found");
//     }
//     console.log("Todo by ID", todo);
// }).catch((e) => console.log(e));
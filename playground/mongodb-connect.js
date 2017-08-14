/**
 * Created by csche on 16.07.2017.
 */
// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log("Unable to connect to the MongoDB server", err);
    }
    console.log("Connected to MongoDB server");

db.collection("Users").find({"name":"Chris"}).then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
});




// let obj = new ObjectID();
// console.log(obj);
//
// // es 6 destructuring
// // make new variable out of objects properties and have their values
// let user = {name: 'Chris', age: 41};
// let {name} = user;
// console.log(name);


// db.collection('Todos').insertOne({
//     text: 'something to do',
//     completed: false
// }, (err, res) => {
//     if (err){
//         return console.log('Unable to insert to do', err);
//     }
//
//     console.log(JSON.stringify(res.ops, undefined, 2));
// });

// insert document into User (name, age ,location)

// db.collection('Users').insertOne({
//     name: 'Christian Scheidler',
//     age: 41,
//     location: 'Ulm'
// }, (err, res) => {
//     if (err){
//         return console.log('Unable to insert user', err);
//     }
//
//     console.log(JSON.stringify(res.ops[0]._id.getTimestamp()));
// });
    db.close();
});


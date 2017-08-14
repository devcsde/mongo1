/**
 * Created by csche on 16.07.2017.
 */

// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log("Unable to connect to the MongoDB server");
    }
    console.log("Connected to MongoDB server");

    // query DB  for all values leave find empty
    db.collection("Todos").find({
        // use new objectID to make a number instead of a string
        _id: new ObjectID("596bd3f89f8060283029c64b")
    }).toArray().then((docs) => {
        console.log("Todos");
        console.log(JSON.stringify(docs, undefined, 2));
    }, function (err) {
        console.log("Unable to fetch todos", err);
    });

    // db.close();
});
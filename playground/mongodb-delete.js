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

    // deleteMany
    // db.collection("Todos").deleteMany({"text":"est lunch"}).then((res) => {
    //    console.log(res);
    // });

    // deleteOne
    // db.collection("Todos").deleteOne({"text":"something to do"}).then((res) => {
    //     console.log(res);
    // });

    // findAndDelete
    // db.collection("Todos").findOneAndDelete({"finished":"false"}).then((res) => {
    //     console.log(res);
    // });

    // db.collection("Users").deleteMany({"name":"Christian Scheidler"}).then((res) => {
    //     console.log(res);
    // });

    db.collection("Users").findOneAndDelete({"_id":1.0}).then((res) => {
        console.log(res);
    });

    // db.close();
});
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


    // user update name to my name + increment age by 1

    db.collection("Users").findOneAndUpdate({
        _id:new ObjectID("596e7d31a336dcf071193fbe")
    },{
        $set: {
            name:"Chris"
        },
        $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    });


    // db.collection("Todos").findOneAndUpdate({
    //     _id: new ObjectID("596e7cb82dc380b3f826d6fa")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res);
    // });

    // db.close();
});
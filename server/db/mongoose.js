/**
 * Created by csche on 19.07.2017.
 */
let mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp",{
    useMongoClient: true,
    /* other options */
});

module.exports = {mongoose};
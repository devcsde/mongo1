"use strict";

/**
 * Created by csche on 19.07.2017.
 */
// User
// email - require - trim - set type - set min length of 1
var mongoose = require("mongoose");
var validator = require("validator");
var jwt = require("jsonwebtoken");
var _ = require("lodash");

var UserSchema = new mongoose.Schema({
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
        minlength: 6,
        trim: true,
        unique: true,
        validate: {
            isAsync: false,
            validator: validator.isEmail,
            message: "{VALUE} is not a valid email"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ["_id", "email"]);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = "auth";
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access: access
    }, "abc123").toString();

    user.tokens.push({
        access: access,
        token: token
    });

    return user.save().then(function () {
        return token;
    });
};

var User = mongoose.model("Users", UserSchema);

module.exports = { User: User };

// let user1 = new User({
//     firstName: "Chris",
//     email: "mail@mil.de"
// });
//
// user1.save().then((res) => {
//    console.log(JSON.stringify(res, undefined, 2));
// });

// let user2 = new User({
//     firstName: "Tom",
//     lastName: "Kruger"
// });
//
// user2.save().then((res) => {
//     console.log(JSON.stringify(res, undefined, 2));
// });
//# sourceMappingURL=user.js.map
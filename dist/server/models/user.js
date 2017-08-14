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
var bcrypt = require("bcryptjs");

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
    }, process.env.JWT_SECRET).toString();

    user.tokens.push({
        access: access,
        token: token
    });

    return user.save().then(function () {
        return token;
    });
};

UserSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull: {
            tokens: { token: token }
        }
    });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded = void 0;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject();
    }

    return User.findOne({
        "_id": decoded._id,
        // query a nested document in db array with ""
        "tokens.token": token,
        "tokens.access": "auth"
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({ email: email }).then(function (user) {
        if (!user) {
            return Promise.reject();
        }

        return new Promise(function (resolve, reject) {
            bcrypt.compare(password, user.password, function (err, res) {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

//middleware always needs next
UserSchema.pre("save", function (next) {
    var user = this;

    if (user.isModified("password")) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

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
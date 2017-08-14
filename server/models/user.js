/**
 * Created by csche on 19.07.2017.
 */
// User
// email - require - trim - set type - set min length of 1
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

let UserSchema = new mongoose.Schema({
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
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ["_id", "email"]);
};

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = "auth";
    let token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, process.env.JWT_SECRET).toString();
    
    user.tokens.push({
        access, 
        token
    });
    
    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};

UserSchema.statics.findByToken = function (token) {
    let User = this;
    let decoded;

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
    let User = this;

    return User.findOne({email}).then((user) => {
        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res){
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
    let user = this;

    if (user.isModified("password")){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

let User = mongoose.model("Users", UserSchema);

module.exports = {User};

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
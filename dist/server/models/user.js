"use strict";

/**
 * Created by csche on 19.07.2017.
 */
// User
// email - require - trim - set type - set min length of 1
var mongoose = require("mongoose");

var User = mongoose.model("Users", {
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
        minlength: 1,
        trim: true
    }
});

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
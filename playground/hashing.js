/**
 * Created by csche on 24.07.2017.
 */
// const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// let password = "123abc!";
//
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

let hashedPassword = "$2a$10$yTvN2rouAH3NZnob07qtk.KoXEjkelLafdmSRedMip6FQTU5lA/Za";
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});


// data = {
//     id: 10
// };
//
// var token = jwt.sign(data, "123abc");
// console.log(token);
//
//
// var decoded = jwt.verify(token, "123abc");
// console.log("decoded", decoded);

// var message = "I am user number 3";
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`HASH: ${hash}`);
//
// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// };
//
// var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();
//
// if (resultHash === token.hash){
//     console.log("Data was not changed");
// }else {
//     console.log("Data was changed! Do not trust!");
// }
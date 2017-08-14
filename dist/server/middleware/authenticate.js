"use strict";

/**
 * Created by csche on 24.07.2017.
 */
var _require = require("./../models/user"),
    User = _require.User;

var authenticate = function authenticate(req, res, next) {
    var token = req.header("x-auth");
    User.findByToken(token).then(function (user) {
        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch(function (e) {
        res.status(401).send();
    });
};

module.exports = { authenticate: authenticate };
//# sourceMappingURL=authenticate.js.map
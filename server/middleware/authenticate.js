/**
 * Created by csche on 24.07.2017.
 */
let {User} = require("./../models/user");

let authenticate = async (req, res, next)=> {
    try {
        let token = req.header("x-auth");
        const user = await User.findByToken(token);
        if (!user){
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).send();
    }
};

module.exports = {authenticate};
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config.json');


/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
    //console.log(req.body);
    //console.log(req.body.auth);
    return next();
    //console.log(req.body.auth);
    console.log(req.headers.Authorization);
    if (!req.headers.authorization) {
        return res.status(401).end();
    }


    // get the last part from a authorization header string like "bearer token-value"
    var token = req.headers.authorization.split(' ')[1];

    // decode the token using a secret key-phrase
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) { return res.status(401).end(); }

        const userId = decoded.sub;

        // check if a user exists
        return User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
                return res.status(401).end();
            }

            return next();
        });
    });
};
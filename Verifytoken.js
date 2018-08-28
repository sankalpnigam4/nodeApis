var jwt = require('jsonwebtoken'); 
var config = require('./config');

exports.verify_token = function(req, res) {

    var token = req.headers['x-access-token'];

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' 
        });
        req.userid = decoded.id;
        next();
    });
};

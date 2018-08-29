const User = require('../models/user.model');
const Message = require('../models/messages.model');
const Blocked = require('../models/blocked.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');



exports.register = function(req,res)
{
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let user = new User(
        {
            username: req.body.username,
            password: hashedPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          config.secret = token;
          config.loggeduser = user.username;
          res.status(200).send({ auth: true, token: token });
    });
};

exports.send_message = function(req,res) {
    if(req.headers['authorization'] == config.secret ) {
    let message = new Message(
        {
            owner: req.body.owner,
            from: config.loggeduser,
            message: req.body.message,
            subject: req.body.subject,

        }
    );

    message.save(function (err) {
        if (err) {
            console.log(err);
        }
        res.send('Message has been sent successfully');
    });

}
}

exports.inbox = function (req, res) {
    if(req.headers['authorization'] == config.secret ) {
    Message.find({owner:config.loggeduser},function (err, message) {
        var userMessage = {};

        message.forEach(function(message) {
          userMessage[message.id] = message;
        });
    
        res.send(userMessage);
    })
  }
};

exports.blocked = function(req,res){
    
    if(req.headers['authorization'] == config.secret )
 {
    let blocked = new Blocked(
        {
            username: req.params.username,
            from : config.loggeduser

        }
    );

    blocked.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('UserName added into blocked list');
    });  
 }    
}

exports.login = function(req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {

        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        config.secret = token;
        config.loggeduser = user.username;
        res.status(200).send({ auth: true, token: token });
    });
};
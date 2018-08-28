const User = require('../models/user.model');
const Message = require('../models/messages.model');
const Blocked = require('../models/blocked.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('User Found!');
};

exports.register = function(req,res)
{
    let user = new User(
        {
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            authtoken: req.body.authtoken
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Registered successfully \n'+'User Name is : '+user.firstname+' '+user.lastname);
    });
};

exports.send_message = function(req,res) {
    let message = new Message(
        {
            owner: req.body.owner,
            from: req.body.from,
            message: req.body.message,
            subject: req.body.subject

        }
    );

    message.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Message has been sent successfully');
    });
}

exports.inbox = function (req, res) {
    Message.find({},function (err, message) {
        var userMessage = {};

        message.forEach(function(message) {
          userMessage[message.id] = message;
        });
    
        res.send(userMessage);
    })
};

exports.blocked = function(req,res){

    let blocked = new Blocked(
        {
            username: req.params.username,
            from : req.headers['username']

        }
    );

    blocked.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('UserName added into blocked list');
    });  
    
}
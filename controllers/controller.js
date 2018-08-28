const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('User Found!');
};

exports.create_user = function(req,res)
{
    let user = new User(
        {
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Registered successfully \n'+'User Name is : '+user.firstname+' '+user.lastname);
    });
};
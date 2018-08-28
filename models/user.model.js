const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username : {type: String, required: true, max: 100},
    password : {type: String, required: true},
    firstname : {type: String, required: true, max: 100},
    lastname : {type: String, required: true, max: 100},
    authtoken : {type: String}
});


// Export the model
module.exports = mongoose.model('User', UserSchema);
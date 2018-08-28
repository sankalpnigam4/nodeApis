const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blocked = new Schema({
    from : {type: String, required: true},
    username : {type: String, required: true}
});


// Export the model
module.exports = mongoose.model('blocked', blocked);
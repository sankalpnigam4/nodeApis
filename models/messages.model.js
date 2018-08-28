const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
    owner : {type: String, required: true},
    from : {type: String, required: true},
    message : {type: String, required: true},
    subject : {type: String}
});


// Export the model
module.exports = mongoose.model('Message', MessageSchema);
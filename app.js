
const express = require('express');
const bodyParser = require('body-parser');
const userroute = require('./routes/route'); // Imports routes for the products
const app = express();
const mongoose = require('mongoose');



// Set up mongoose connection

let dev_db_url = 'mongodb://localhost:27017/Mongobase';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/user', userroute);

let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
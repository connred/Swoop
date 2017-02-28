//////////////////////////////////
// TO DO                        //
// Get data from backend        //
// Get requests from frontend   //
// Match up data                //
// Send to front end            //
//////////////////////////////////
var http = require('http'); // http protocol
var express = require('express'); // web server
var bodyParser = require('body-parser'); // http body parser
var mongodb = require('mongodb');

var Mongo = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
const MONGO_URL = 'mongodb://localhost:27017/apcsp';
Mongo.connect(MONGO_URL, function (err, db) {
    if (err) log('error');
    else log('good to go');
    Mongo.ops = {};
    // TODO: Add needed Functions
});
function allowCrossDomain(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    // end pre flights
}
var app = express();
// use middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(allowCrossDomain);
function log(msg){
    console.log(msg);
}
app.listen(3000, function () {
    log('listening on port 3000');
});
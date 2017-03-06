//////////////////////////////////
//           SWOOP JS           //
//////////////////////////////////
// Get data from backend        //
// Get requests from frontend   //
// Match up data                //
// Send to front end            //
//////////////////////////////////
var http = require('http'); // http protocol
var express = require('express'); // web server
var bodyParser = require('body-parser'); // http body parser
var mongodb = require('mongodb');
var socketio = require('socket.io');

var Mongo = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
const MONGO_URL = 'mongodb://localhost:27017/apcsp';
///////////////
// MONGO OPs //
///////////////
Mongo.connect(MONGO_URL, function (err, db) {
    if (err) log('error');
    else log('good to go');
    Mongo.ops = {};
    // TODO: Add needed Functions
    Mongo.ops.upsert = function (collection, query, json, callback) {
        db.collection(collection).updateOne(query, {
            $set: json
        }, {
            upsert: true
        }, function (err, result) {
            // TODO: handle err
            if (callback) callback(err, result);
        });
    };
});
////////////////////
// Cross Domains  //
////////////////////
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
///////////////
//  NodeJS   //
///////////////
app.update('/car1', function (req, res, next) {
    log('/car1 req.body =', req.body);
    var payload = req.body
    io.sockets.emit('addcar1', req.body);
    Mongo.ops.upsert('car1', payload, function (err, response) {
        if (err) {
            console.log(err);
        }
        else {
            //console.log(response);
            res.status(201).send('ok');
        }
    });
});
app.update('/car2', function (req, res, next) {
    log('/car2 req.body =', req.body);
    var payload = req.body
    io.sockets.emit('addcar2', req.body);
    Mongo.ops.upsert('car2', payload, function (err, response) {
        if (err) {
            console.log(err);
        }
        else {
            //console.log(response);
            res.status(201).send('ok');
        }
    });
});
app.update('/car3', function (req, res, next) {
    log('/car3 req.body =', req.body);
    var payload = req.body
    io.sockets.emit('addcar3', req.body);
    Mongo.ops.upsert('car3', payload, function (err, response) {
        if (err) {
            console.log(err);
        }
        else {
            //console.log(response);
            res.status(201).send('ok');
        }
    });
});
app.listen(3000, function () {
    log('listening on port 3000');
});
///////////////
// SOCKET iO //
///////////////
var io = socketio.listen(server, { origins : '*:*' });

io.sockets.on('connection', function(socket) {
    log('new socket client: ', socket.id);
    
    socket.on('disconnect', function() {
        log('socket client disconnected: ', socket.id);
    });
    
    socket.on('addcar1', function(data) {
        log('car lat and long: ' + data.lat + ", " + data.long);
        socket.broadcast.emit('car1', data);
    })
    socket.on('addcar2', function(data) {
        log('car lat and long: ' + data.lat + ", " + data.long);
        socket.broadcast.emit('car2', data);
    })
    socket.on('addcar3', function(data) {
        log('car lat and long: ' + data.lat + ", " + data.long);
        socket.broadcast.emit('car3', data);
    })
});
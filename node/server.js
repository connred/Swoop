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
var request = require('request');
var fs = require('fs');
var Mongo = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var http = require('http').Server(app);
const MONGO_URL = 'mongodb://localhost:27017/swoop';
///////////////
// MONGO OPs //
///////////////
Mongo.connect(MONGO_URL, function (err, db) {
    if (err) log('error');
    else log('Mongo is active on port 27017');
    Mongo.ops = {};
    // TODO: Add needed Functions
    Mongo.ops.upsert = function(collection, query, json, callback) {
        db.collection(collection).updateOne(query, { $set: json }, { upsert: true }, function(err, result) {
            if (callback) callback(err, result);
        });
    };
    Mongo.ops.insert = function (collection, json, callback) {
        db.collection(collection).insert(json, function (err, result) {
            if (callback) callback(err, result);
        });
    };
});
////////////////////
// Cross Domains  //
////////////////////
/*function allowCrossDomain(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    // end pre flights
}
//
var app = express();
// use middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(allowCrossDomain);
*/
///////////////
// SOCKET iO //
///////////////
var server = http.listen(8080, function () {
    console.log('socket io server listening on http://localhost:8080/');
});
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    log('new socket client: ', socket.id);
    socket.on('disconnect', function () {
        log('socket client disconnected: ', socket.id);
    });
    socket.on('addcar1', function (data) {
        log('car lat and long: ' + data.lat + ", " + data.long);
        socket.broadcast.emit('car1', data);
    })
    socket.on('addcar2', function (data) {
        log('car lat and long: ' + data.lat + ", " + data.long);
        socket.broadcast.emit('car2', data);
    })
    socket.on('addcar3', function (data) {
        log('car lat and long: ' + data.lat + ", " + data.long);
        socket.broadcast.emit('car3', data);
    })
});
///////////////
//  NodeJS   //
///////////////
var app = express();
// use middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.post('/car1', function (req, res, next) {
    log('/car1 req.body =' + JSON.stringify(req.body));
    var payload = req.body;
    io.sockets.emit('addcar1', payload);
    Mongo.ops.upsert('car1current', payload, function (err, response) { // NEED TO FIX THIS, NOT POSTING PROPERLY
        if (err) {
            console.log(err);
        }
        else {
            res.status(201).send('ok');
            console.log('/car1-current sent');
        }
    });
    Mongo.ops.insert('car1all', payload, function (err, response) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(201).send('ok');
            console.log('/car1all sent');
        }
    });
});
app.post('/car2', function (req, res, next) {
    log('/car2 req.body =' + JSON.stringify(req.body));
    var payload = req.body;
    io.sockets.emit('addcar2', payload);
    Mongo.ops.upsert('car2current', payload, function (err, response) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(201).send('ok');
            console.log('car2-current sent');
        }
    });
    Mongo.ops.insert('car2all', payload, function (err, response) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(201).send('ok');
            console.log('car2-all sent');
        }
    });
});
app.post('/car3', function (req, res, next) {
    log('/car3 req.body =' + JSON.stringify(req.body));
    var payload = req.body;
    io.sockets.emit('addcar3', payload);
    Mongo.ops.upsert('car3current', payload, function (err, response) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(201).send('ok');
            console.log('car3-current sent');
        }
    });
    Mongo.ops.insert('car3all', payload, function (err, response) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(201).send('ok');
            console.log('car3-all sent');
        }
    });
});
app.listen(3000, function () {
    log('nodeJS listening on port 3000');
});

///////////////
//    LOG    //
///////////////
function log(msg) {
    console.log(msg);
}
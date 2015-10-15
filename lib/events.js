var mongo = require('mongodb');
var fs = require("fs");
var config = require('./config');

var Server = mongo.Server,
    MongoDb = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new MongoDb(config.dbName, server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'interdesigners' database");
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving event: ' + id);
    db.collection('events', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('events', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addEvent = function(req, res) {
    var event = req.body;
    console.log('Adding event: ' + JSON.stringify(event));
    db.collection('events', function(err, collection) {
        collection.insert(event, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateEvent = function(req, res) {
    var id = req.params.id;
    var event = req.body;
    console.log('Updating event: ' + id);
    console.log(JSON.stringify(event));
    db.collection('events', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, event, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating event: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(event);
            }
        });
    });
}

exports.deleteEvent = function(req, res) {
    var id = req.params.id;
    console.log('Deleting event: ' + id);
    db.collection('events', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

exports.getImage = function(req, res){
	res.writeHead(200,{"content-type":"text/plain;charset=UTF8;"});
	// res.writeHead(200,{"content-type":"image/jpeg;charset=UTF8;"});
	var url = req.param("id")+".jpg";
	if(fs.readdirSync("images").indexOf(url) == -1){
		url = "default.jpg";
	}
	url = "images/" + url;
	// var image = new Buffer(fs.readFileSync(url).toString(), "binary").toString("base64");
	var image = fs.readFileSync(url).toString("base64");
	res.end(image);
}

exports.getImageFile = function(req, res){
	// res.writeHead(200,{"content-type":"text/plain;charset=UTF8;"});
	res.writeHead(200,{"content-type":"image/jpeg;charset=UTF8;"});
	var url = req.param("id")+".jpg";
	if(fs.readdirSync("images").indexOf(url) == -1){
		url = "default.jpg";
	}
	url = "images/" + url;
	// var image = new Buffer(fs.readFileSync(url).toString(), "binary").toString("base64");
	var image = fs.readFileSync(url);
	res.end(image);
}
var mongo = require('mongodb');
var fs = require("fs");
var config = require('./config');

var Server = mongo.Server,
    MongoDb = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new MongoDb(config.dbName, server);

var createJson = function(){
    var baseJson = {
        "datas": [
            {
                "id": 0,
                "value": "05/11"
            },
            {
                "id": 1,
                "value": "06/11"
            },
            {
                "id": 2,
                "value": "07/11"
            }
        ],
        "horarios": [
            {
                "id": 0,
                "value": "8"
            },
            {
                "id": 1,
                "value": "9"
            },
            {
                "id": 2,
                "value": "10"
            },
            {
                "id": 3,
                "value": "11"
            },
            {
                "id": 4,
                "value": "12"
            },
            {
                "id": 5,
                "value": "13"
            },
            {
                "id": 6,
                "value": "14"
            },
            {
                "id": 7,
                "value": "15"
            },
            {
                "id": 8,
                "value": "16"
            },
            {
                "id": 9,
                "value": "17"
            },
            {
                "id": 10,
                "value": "18"
            },
            {
                "id": 11,
                "value": "19"
            },
            {
                "id": 12,
                "value": "20"
            }
        ],
        "eventos": [],
        "locais": [
            {
                "id": 0,
                "value": "Guilhermão"
            },
            {
                "id": 1,
                "value": "Bosque"
            },
            {
                "id": 2,
                "value": "Sala 1"
            },
            {
                "id": 3,
                "value": "Sala 52"
            },
            {
                "id": 4,
                "value": "Sala 53"
            },
            {
                "id": 5,
                "value": "Sala 55"
            },
            {
                "id": 6,
                "value": "Sala 56"
            },
            {
                "id": 7,
                "value": "Sala 57"
            },
            {
                "id": 8,
                "value": "Sala 58"
            },
            {
                "id": 9,
                "value": "LDMP"
            },
            {
                "id": 10,
                "value": "LEDD"
            },
            {
                "id": 11,
                "value": "Oficina Gráfica"
            }
        ]
    };
    return baseJson;
}

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'interdesigners' database");
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving event: ' + id);
    db.collection('events', function(err, collection) {
        collection.findOne({'_id':new mongo.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('events', function(err, collection) {
        collection.find().toArray(function(err, allEvents) {
            var items = createJson();
            items.eventos = allEvents;
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
        collection.update({'_id':new mongo.ObjectID(id)}, event, {safe:true}, function(err, result) {
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
        if(!err){
            collection.remove({'_id':new mongo.ObjectID(id)}, {safe:true}, function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred - ' + err});
                } else {
                    console.log('' + result + ' document(s) deleted');
                    res.send(req.body);
                }
            });
        }
        else {
            res.send({'error':'An error has occurred - ' + err});
        }
    });
}

exports.getImage = function(req, res){
	res.writeHead(200, {"content-type": "text/plain;charset=UTF8;" });
	
    var url = ".jpg";
    if(!("id" in req.params))
		url = "default" + url;
    else
        url = req.params.id + url;
	url = config.imgSrc + url;
	fs.readFile(url, function (err, data) {
        if (err) {
            res.end();
        } 
        else {
            res.end(data.toString("base64"));
        }
    });
}

exports.getImageFile = function(req, res){
	res.writeHead(200, { "content-type": "image/jpeg;charset=UTF8;" });
	
    var url = ".jpg";
    if(!("id" in req.params))
		url = "default" + url;
    else
        url = req.params.id + url;
	url = config.imgSrc + url;
    
	fs.readFile(url, function (err, data) {
        if (err) {
            res.end();
        } 
        else {
            res.end(data);
        }
    });
    //var image = fs.readFileSync(url);
	//res.end(image);
}
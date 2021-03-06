var express = require('express'),
    event = require('./lib/events');
var cors = require("cors");
var bodyParser = require("body-parser");
var config = require('./lib/config');

var app = express();

app.use(cors());
app.use(bodyParser.json());

// tudo em /api/ está exposto no nginx, os outros somente interno

app.get('/api/events', event.findAll);
//app.get('/api/events/:id', event.findById);

// imagem
app.get("/api/events/image/:id", event.getImage);
app.get("/api/events/imagefile/:id", event.getImageFile);

app.post('/events', event.addEvent);
app.put('/events/:id', event.updateEvent);
app.delete('/events/:id', event.deleteEvent);

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
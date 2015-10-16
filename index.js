var express = require('express'),
    event = require('./lib/events');
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api/events', event.findAll);
app.get('/api/events/:id', event.findById);

app.get("/api/events/image/:id", event.getImage);

app.get("/api/events/imagefile/:id", event.getImageFile);

app.post('/events', event.addEvent);
app.put('/events/:id', event.updateEvent);
app.delete('/events/:id', event.deleteEvent);

app.listen(3000);
console.log('Listening on port 3000...');
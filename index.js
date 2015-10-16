var express = require('express'),
    event = require('./lib/events');
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

//app.configure(function () {
//    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
//    app.use(express.bodyParser());
//});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/events', event.findAll);
app.get('/event/:id', event.findById);

app.get("/event/image/:id", event.getImage);

app.get("/event/imagefile/:id", event.getImageFile);

app.post('/event', event.addEvent);
app.put('/events/:id', event.updateEvent);
app.delete('/events/:id', event.deleteEvent);

app.listen(3000);
console.log('Listening on port 3000...');
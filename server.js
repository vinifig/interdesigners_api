var api = require("./index.js");
var express = require("express");
var app = express();

var host, port;

app.get("/", function( req, res){
	console.dir(api.get());
	// res.end(api.get());
	res.end("CARREGOU DIREITO UHUL");
});

app.post("/",function( req, res){
	res.end(api.post());
});

var server = app.listen("80",function(){
	host = server.address().address;
	port = server.address().port;
	console.log("\nHost: " + host + "\nPorta: " + port);
})
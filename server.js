var express = require("express");
var fs = require("fs");
var app = express();
var mysql = require("mysql");
var cors = require("cors");

var host, port;

var eventos, datas, horarios, locais;

var connection = mysql.createConnection({
	host     : '127.0.0.1',
	user     :  'root',
	password : '',
	database : 'interdesigners'
});

connection.connect();

app.use(cors());

app.get("/", function( req, res){
	atualiza();
	
	res.end(JSON.stringify({
		'datas' : datas,
		'horarios' : horarios,
		'eventos' : eventos,
		'locais' : locais,
		'result' : true
	}));
});

app.get("/form",function( req, res){
	res.end(fs.readFileSync('www/form.html'));
});

app.post("/form",function( req, res){
	
	res.end(fs.readFileSync('www/form.html'));
});

var server = app.listen("80",function(){
	host = server.address().address;
	port = server.address().port;
	console.log("\nHost: " + host + "\nPorta: " + port);
});

var atualiza = function(){
 	connection.query("SELECT * FROM Eventos", function(err, rows, fields){
		eventos = Array();
		for(var i = 0; i < rows.length; i++){
			eventos[i] = rows[i];
			eventos[i].id = eventos[i].id - 1;
		}
	});
	connection.query("SELECT local FROM Locais", function(err, rows, fields){
		locais = Array();
		for(var i = 0; i < rows.length; i++){
			locais[i] = rows[i].local;
		}
	});
	connection.query("SELECT * FROM Dias", function(e,rows,f){
		datas = Array();
		for(var i = 0; i < rows.length; i++){
			datas[i] = rows[i];
			datas[i].id = datas[i].id - 1;
		}
	});
	connection.query("SELECT * FROM Horarios", function(e,rows,f){
		horarios = Array();
		for(var i = 0; i < rows.length; i++){
			horarios[i] = rows[i];
			horarios[i].id = horarios[i].id - 1;
		}
	});
}



atualiza();
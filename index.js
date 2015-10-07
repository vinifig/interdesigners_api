var express = require("express");
var fs = require("fs");
var mysql = require("mysql");
var cors = require("cors");
var bodyParser = require("body-parser");


var app = express();
var host, port;

var eventos, datas, horarios, locais;

// CONECTANDO AO BANCO DE DADOS

var connection = mysql.createConnection({
	host     : '127.0.0.1',
	user     :  'root',
	password : '',
	database : 'interdesigners_teste'
});

connection.connect();


// CONFIGURANDO SERVIDOR
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// LIGANDO API

app.get("/api", function( req, res){
	atualiza();
	res.writeHead(200,{"content-type":"text/html;charset=UTF8;"});
	res.end(JSON.stringify({
		'datas' : datas,
		'horarios' : horarios,
		'eventos' : eventos,
		'locais' : locais,
		'result' : true
	}));
});

// LIGANDO FORMULARIO

app.get("/form",function( req, res, next){
	res.writeHead(200,{"content-type":"text/html;charset=UTF8;"});
	res.end(fs.readFileSync('www/form.html'));
});


app.post("/form",function( req, res){
	res.writeHead(200,{"content-type":"text/html;charset=UTF8;"});
	var resultado =	insere(req.body);

	res.end(fs.readFileSync('www/form.html'));
});

// INICIALIZACAO DO SERVER

var server = app.listen("80",function(){
	host = server.address().address;
	port = server.address().port;
	console.log("\nHost: " + host + "\nPorta: " + port);
});


// MANIPULACAO DO BD

	// INSERCAO

	var insere = function(data){
		var query = connection.query("INSERT INTO Eventos SET ?", data, function(err,result){
			if(err !== undefined)
				return console.error(err);
			console.log(result);
		});
	}

	// CONSULTA

	var atualiza = function(){
	 	connection.query("SELECT * FROM Eventos", function(err, rows, fields){
			eventos = Array();
			try{
				for(var i = 0; i < rows.length; i++){
					eventos[i] = rows[i];
					eventos[i].id = eventos[i].id - 1;
				}
			}
			catch(err){
				console.error(err);
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
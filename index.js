var express = require("express");
var fs = require("fs");
var mysql = require("mysql");
var cors = require("cors");
var bodyParser = require("body-parser");


var app = express();
var host, port;

var eventos = [],
  datas = [],
  horarios = [],
  locais = [];

// CONECTANDO AO BANCO DE DADOS

var connection = mysql.createConnection({
	host     : '127.0.0.1',
	user     :  'root',
	password : '',
	database : 'interdesigners'
});

connection.connect();


// CONFIGURANDO SERVIDOR
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//GETS


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

// LIGANDO GET DE IMAGE

app.get("/image/:id", function(req, res){
	res.writeHead(200,{"content-type":"text/plain;charset=UTF8;"});
	// res.writeHead(200,{"content-type":"image/jpeg;charset=UTF8;"});
	var url = req.param("id")+".jpg";
	if(fs.readdirSync("www/images").indexOf(url) == -1){
		url = "default.jpg";
	}
	url = "www/images/" + url;
	// var image = new Buffer(fs.readFileSync(url).toString(), "binary").toString("base64");
	var image = fs.readFileSync(url).toString("base64");
	res.end(image);
});


app.get("/imagefile/:id", function(req, res){
	// res.writeHead(200,{"content-type":"text/plain;charset=UTF8;"});
	res.writeHead(200,{"content-type":"image/jpeg;charset=UTF8;"});
	var url = req.param("id")+".jpg";
	if(fs.readdirSync("www/images").indexOf(url) == -1){
		url = "default.jpg";
	}
	url = "www/images/" + url;
	// var image = new Buffer(fs.readFileSync(url).toString(), "binary").toString("base64");
	var image = fs.readFileSync(url);
	res.end(image);
});


// INICIALIZACAO DO SERVER

var server = app.listen("8080",function(){
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
			atualiza();
		});
	}

	// CONSULTA

	var atualiza = function(){
	 	connection.query("SELECT * FROM Eventos", function(err, rows, fields){
			try{
				for(var i = 0; i < rows.length; i++){
					eventos[i] = rows[i];
					eventos[i].id = eventos[i].id - 1;
					eventos[i].data = eventos[i].data - 1;
					eventos[i].horario = eventos[i].horario - 1;
					eventos[i].local = eventos[i].local - 1;
				}
			}
			catch(err){
				console.error(err);
			}
		});
		connection.query("SELECT local FROM Locais", function(err, rows, fields){
			try{
				for(var i = 0; i < rows.length; i++){
					locais[i] = rows[i].local;
				}
			}catch(e){}
		});
		connection.query("SELECT * FROM Dias", function(e,rows,f){
			try{
				for(var i = 0; i < rows.length; i++){
					datas[i] = rows[i];
					datas[i].id = datas[i].id - 1;
				}
			}catch(e){}
		});
		connection.query("SELECT * FROM Horarios", function(e,rows,f){
			try{
				for(var i = 0; i < rows.length; i++){
					horarios[i] = rows[i];
					horarios[i].id = horarios[i].id - 1;
				}
			}catch(e){}
		});
	}

//FUNÇOES AUXILIARES

var getEventID = function(id){
	for(var i = 0; i < eventos.length && i < id; i++ ){
		console.log(eventos[i].id + " e " + id);
		if(eventos[i].id == id)
			return i;
	}
	return -1;
}


atualiza();
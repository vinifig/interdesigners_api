var fs = require("fs"),
	Mongoose = require('mongoose'),
	db = Mongoose.connection,
	Schema = Mongoose.Schema,
	ObjectId = Schema.ObjectId,
	Post, PostTest;

var get = function(){
	/*try{
		return fs.readFileSync("./postsData.json");
	}catch(e){
		return e.toString();
	}*/
	var Query = Post.readAll(null);
	return Query;
}

var post = function(title, message){
	var HelloWorld = new Post({
		title : "HELLO, WORLD!",
		message : "This is a Mongo World"	
	});
	
	HelloWorld.save(function(err, thor){
		if(err) return console.error(err);
	});
	return (HelloWorld.toString());
}

module.exports.get = get;
module.exports.post = post;



db.on("error",function(){
	console.log("teste");
});

db.once("open", function(){
	console.log("Conectou");
	

	PostTest = new Schema({
	        title   : String,
	        message : String
	});

	PostTest.statics.readAll = function(callback){
		return this.find({ hasCreditCookie: true }, callback)
	}
	
	Post = Mongoose.model("Post",PostTest);

	var HelloWorld = new Post({
		title : "HELLO, WORLD!",
		message : "This is a Mongo World"	
	});
	
	HelloWorld.save(function(err, hello){
		if(err) return console.error(err);
		console.dir(hello);
	});

});
Mongoose.connect("mongodb://localhost/test");


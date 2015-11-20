var express=require("express"),path=require("path"),logger=require("morgan"),mongoose=require("mongoose"),bodyParser=require("body-parser"),config=require("./server/config"),app=express();app.use(logger("dev")),app.set("port",config.port),app.use(bodyParser.urlencoded({extended:!1})),app.use(bodyParser.json()),"development"==config.env?app.use(express["static"](path.join(__dirname,"src"))):app.use(express["static"](path.join(__dirname,"client"))),mongoose.connect(config.mongoUri,function(e){e&&console.log(e)}),require("./server/routes")(app),app.listen(config.port,function(){console.log("Listening on port "+config.port)}),exports=module.exports=app;
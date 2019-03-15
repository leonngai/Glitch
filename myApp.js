
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

/** 1) Meet the node console. */
// console.log("Hello World");

/** 2) A first working Express Server */
// app.get("/", function(req, res) {
//   res.send('Hello Express');
// });

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
//NOTE: Express evaluates functions in the order they appear in the code. 
// This is true for middleware too. If you want it to work for all the routes, 
// it should be mounted before them.
app.use(function(req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

/** 4) Serve static assets  */
// first is the path that uses the static files, second is the path to the static files
// in this case it would be the path to the style.css file
//note that if you leave the first path blank ie start with (express.static ... then it will just use this file for every 
// single request
app.use("/",express.static(__dirname + '/public'));

/** 3) Serve an HTML file */
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



/** 5) serve JSON on a specific route */
// app.get("/json", function(req, res) {
//   res.json({"message": "Hello json"});
// });

/** 6) Use the .env file to configure the app */
 app.get("/json", function(req, res) {
   if (process.env.MESSAGE_STYLE == 'uppercase') {
     res.json({"message": "HELLO JSON"});
   }
   else {   
     res.json({"message": "Hello json"});
   }
});
 


/** 8) Chaining middleware. A Time server */
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time});
});

/** 9)  Get input from client - Route parameters */
// the colon in front of word will basically take the word entered in between
// those slashes and store it in req.params.word
//req.params is a json that looks like this 
// req.params: {word: blahblah}
app.get('/:word/echo', function(req, res) {
  res.json({echo: req.params.word});
});

  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use('/name',bodyParser.urlencoded({extended:false}));


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
//so entering url as www.fhjdhfdj/name?first=leon&last=ngai
//sends back json of {name: leon ngai}
app.get('/name', function(req, res) {
  res.json({name: req.query.first + " " + req.query.last});
});
  



/** 12) Get data form POST  */
//following code is activated from index.html file form which sends the first and last name 
//over to the name route, upon completion it is shown to the user via JSON
app.post('/name', function(req, res) {
  res.json({name: req.body.first + " " + req.body.last});
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;

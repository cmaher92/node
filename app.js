var express = require('express');
var mustacheExpress = require('mustache-express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var mongo = require('mongoskin');

var db = mongo.db("mongodb://localhost:27017/node_app", {native_parser:true});

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Routes
app.get('/', function(req, res) {
  res.render('index', {
    name: 'Connor',
    age: 23
  });
})

app.post('/users', function (req, res) {
  db.bind('users').insert({
    name: req.body.name,
    age: req.body.age
  });
  res.render('index', {
    name: req.body.name,
    age: req.body.age
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

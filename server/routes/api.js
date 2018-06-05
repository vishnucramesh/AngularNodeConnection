const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
router.get('/create', (req, res) => {


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("sample");
  dbo.createCollection("listname", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  dbo.createCollection("listelement", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  
});res.send('Successfully added');
});

router.post('/test', (request, response) => {
  console.log(request.body.name);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sample");
    dbo.collection("listname").insertOne(request.body, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  
});

router.post('/getname', (request, response) => {
  console.log(request.body.name);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sample");
    var query = { name:'' };

  dbo.collection("listname").find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    response.send(result);
  });

  });
  
});

router.post('/getelement', (request, response) => {
  console.log();
  console.log(request.body.name );

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sample");
    var query = { name: request.body.name };

  dbo.collection("listelement").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    response.send(result);
  });

  });
  
});

 
router.post('/createelement', (request, response) => {
  console.log(request.body.list);
  let temp={
    list:request.body.list
  }
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sample");
  dbo.collection("listelement").insertOne({name:request.body.name,list:temp.list}, function(err, res) {
    if (err) throw err; 
  });
  
  });

});
router.post('/updateelement', (request, response) => {
  console.log(request.body.list); 
  let temp={
    list:request.body.list
  }
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sample");
  var myquery = { name : request.body.name };
    var new_list={$set: {list: temp.list}}
    dbo.collection("listelement").updateOne(myquery ,new_list, function(err, res) {
      if (err) throw err; 
    });

 
  });

});

module.exports = router; 

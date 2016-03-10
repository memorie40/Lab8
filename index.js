var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var commentDB = mongoose.createConnection('mongodb://localhost/commentDB');  
var comicDB = mongoose.createConnection('mongodb://localhost/comicDB');
//Connects to mongo db called commentDB & Comic DB

var Schema = mongoose.Schema;  //Defines the Schema for the db
var commentSchema = new Schema({
  Name: String,
  Comment: String
}, {collection: 'comments'});

var Comment = commentDB.model("Comment", commentSchema); 
//makes an object from that schema as a model

var comicSchema = new Schema({
  Filename: String,
  Keywords: String,
  Searchable: String
}, {collection: 'comics'});

var Comic = comicDB.model("Comic", comicSchema);

commentDB.on('error', console.error.bind(console, 'connection error:'));
commentDB.once('open', function() {
  console.log('Connected to commentDB');
});

comicDB.on('error', console.error.bind(console, 'connection error:'));
comicDB.once('open', function() {
  console.log('Connected to comicDB');
});


/* GET comments from database */ 
router.get('/comment', function(req, res, next) { 
  console.log("In the GET route");
  Comment.find(function(err, commentList) { //calls the find() in database
    if (err) return console.error(err); //prints error
    else {
      console.log(commentList); //log the comments found
      res.json(commentList);
    }
  });
});

router.get('/comic', function(req, res, next){
  console.log("Getting comics...");
  Comic.find( function(err, comicList) {
    if(err) return console.error(err);
    else {
      console.log(comicList);
      res.json(comicList);
    }
  });
});

/* POST COMMENT */
router.post('/comment', function(req, res, next) { 
  console.log("POST comment route"); //[1] 
  console.log(req.body); //[2]
  var newcomment = new Comment(req.body);
  console.log(newcomment);  //[3]
  newcomment.save(function (err, post) { //[4]
      if (err) return console.error (err);
      console.log(post);
      res.sendStatus(200);
  });
});


//POST COMIC DATA
router.post('/comic', function(req, res, next) {
  console.log("POST comic");
  var newcomic = new Comic(req.body);
  console.log(newcomic);
  newcomic.save(function (err, post) {
    if(err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

//DELETE COMMENT
router.delete('/comment', function (req, res) {
  console.log("DELETE comments");
  var query = Comment.remove();
  query.exec(function (err, results) {
    console.log("Comments deleted.");
  });
});

module.exports = router;

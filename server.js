var express = require("express");
var expressSanitizer = require('express-sanitizer');
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ShortURL = require("./public/js/shortener.js");
var validUrl = require('valid-url');
var ObjectID = mongodb.ObjectID;
var URLS_COLLECTIONS = 'urls';

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(expressSanitizer());

// Create database
var db;
var url = 'mongodb://127.0.0.1:27017/urls'; // local
// var url = process.env.MONGODB_URI; // heroku deploy

mongodb.MongoClient.connect(url, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    db = database;
    console.log('Database connection successful');
    var server = app.listen(process.env.PORT || 3030, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/*
 * "/urls"
 * GET: find all urls
 * POST: create todo
 */

app.get('/urls', function (req, res) {
   db.collection(URLS_COLLECTIONS).find({}).toArray(function (err, docs) {
       if (err) {
           handleError(res, err.message, 'Failed get urls');
       } else {
           res.status(200).json(docs);
       }
   });
});

app.get("/urls/:id", function(req, res) {
    req.params.id = req.sanitize(req.params.id);
    db.collection(URLS_COLLECTIONS).find({ seqId: String(req.params.id) }).toArray( function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get url");
        } else {
            console.log(docs);
            res.status(200).json(docs);
        }
    });
});

app.post("/urls", function(req, res) {
    var newUrl = req.body;
    if (!req.body.urlPath || !validUrl.isUri(req.body.urlPath)) {
        handleError(res, "Invalid user input", "Must provide a url.", 400);
        return;
    }

    newUrl.seqId = String(Date.now());
    newUrl.shortUrl = ShortURL.encode(newUrl.seqId);

    db.collection(URLS_COLLECTIONS).insertOne(newUrl, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new url.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

app.put("/urls/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(URLS_COLLECTIONS).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update url");
        } else {
            res.status(204).end();
        }
    });
});


app.delete("/urls/:id", function(req, res) {
    db.collection(URLS_COLLECTIONS).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete url");
        } else {
            res.status(204).end();
        }
    });
});













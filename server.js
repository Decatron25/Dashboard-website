//jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = ('body-parser');
const mongoose = require('mongoose');

app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/frameDB', {useNewUrlParser: true, useUnifiedTopology: true});

const frameSchema = new mongoose.Schema ({
  PeopleCount: Number,
  violations: Number
});

const Frame = mongoose.model("Frame", frameSchema);

app.get("/cctv1.html", function(req, res) {
  res.sendFile(__dirname + "public/cctv1.html");
});

app.get("/cctv2.html", function(req, res) {
  res.sendFile(__dirname + "public/cctv2.html");
});

app.get("/cctv3.html", function(req, res) {
  res.sendFile(__dirname + "public/cctv3.html");
});

app.get("/cctv4.html", function(req, res) {
  res.sendFile(__dirname + "public/cctv4.html");
});

app.get("/facemask.html", (req,res) => {
  res.sendFile(__dirname + "public/facemask.html");
});

app.post("/cctv1.html", function(req, res) {
  const frame = new Frame({
    PeopleCount: req.body.count,
    violations: req.body.violations
  });

  frame.save(function(err, docs) {
    if(!err) {
      console.log(docs);
    }
  });
  res.sendStatus(200);
});

app.listen(3000, function() {
  console.log("server running at port 3000");
});

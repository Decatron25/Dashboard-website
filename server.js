//jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = ('body-parser');
const mongoose = require('mongoose');

app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb+srv://Vchirag:nis75nis@cluster0.eu7bd.mongodb.net/frameDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const frameSchema = new mongoose.Schema ({
  PeopleCount: Number,
  violations: Number
},
{
  timestamps: true
});

const Frame1 = mongoose.model("CCTV1frames", frameSchema);
const Frame2 = mongoose.model("CCTV2frames", frameSchema);
const Frame3 = mongoose.model("CCTV3frames", frameSchema);
const Frame4 = mongoose.model("CCTV4frames", frameSchema);

Frame1.deleteMany({}, function(err) {
  if(!err) {
    console.log("All documents deleted from CCTV1frames");
  }
});

Frame2.deleteMany({}, function(err) {
  if(!err) {
    console.log("All documents deleted from CCTV2frames");
  }
});

Frame3.deleteMany({}, function(err) {
  if(!err) {
    console.log("All documents deleted from CCTV3frames");
  }
});

Frame4.deleteMany({}, function(err) {
  if(!err) {
    console.log("All documents deleted from CCTV4frames");
  }
});


app.get("/cctv1.html", function(req, res) {
  console.log("welcome to cctv1");
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
  const frame = new Frame1({
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

app.post("/cctv2.html", function(req, res) {
  const frame = new Frame2({
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

app.post("/cctv3.html", function(req, res) {
  const frame = new Frame3({
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

app.post("/cctv4.html", function(req, res) {
  const frame = new Frame4({

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

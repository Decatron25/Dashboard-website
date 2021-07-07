//jshint esversion:6

const express = require('express');
const app = express();

app.use(express.static('public'));

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

app.listen(3000, function() {
  console.log("server running at port 3000");
});

//jshint esversion:6
const express = require('express');
const app = express();


app.get("/cctv1.html", function(req, res) {
  res.sendFile(__dirname + "/cctv1.html");
});

app.get("/cctv2.html", function(req, res) {
  res.sendFile(__dirname + "/examples/cctv2.html");
});

app.get("/cctv3.html", function(req, res) {
  res.sendFile(__dirname + "/examples/cctv3.html");
});

app.get("/cctv4.html", function(req, res) {
  res.sendFile(__dirname + "/examples/cctv4.html");
});
app.get("/facemask.html", (req,res) => {
  res.sendFile(__dirname + "/examples/facemask.html");
})
app.listen(3000, function() {
  console.log("server running at port 3000");
});

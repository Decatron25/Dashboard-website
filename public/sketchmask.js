//jshint esversion:6
let img;
let x0 = [];
let x1 = [];
let y0 = [];
let y1 = [];
let masked = [];
let size;
let width = [];
let height = [];
function preload() {
  img = loadImage("images/out.jpg")
}

function setup() {
  let canvas = createCanvas(1200, 1200);
  canvas.parent("mask-image");
  let dataUri = img.canvas.toDataURL();
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://face-mask-detection.p.rapidapi.com/FaceMaskDetection",
    "method": "POST",
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
      "x-rapidapi-key": "98ee9e1920mshcc9fd03d01eeee4p12665djsnbad44e92853a",
      "x-rapidapi-host": "face-mask-detection.p.rapidapi.com"
    },
    "data": {
      "imageBase64": dataUri
    }
  };
  $.ajax(settings).done(function(response) {
    size = response.data.length;
    for (var i = 0; i < response.data.length; i++) {
      x0[i] = response.data[i].x0;
      x1[i] = response.data[i].x1;
      y0[i] = response.data[i].y0;
      y1[i] = response.data[i].y1;
      masked[i] = response.data[i].masked;
    }
  });
}

function draw() {
image(img, 0, 0);
  for (i = 0; i < size; i++) {
    if (masked[i] === 0) {
      stroke(255, 0, 0);
    } else {
      stroke(0, 255, 0);
    }
    strokeWeight(3);
    noFill();
    rect(x0[i], y0[i],x1[i]-x0[i],y1[i]-y0[i]);
  }

}

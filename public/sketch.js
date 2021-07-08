//jshint esversion:6

let video;
let detector;
let persons = [];

function preload() {
  detector = ml5.objectDetector('cocossd');
  video = createVideo('loki-resized.mp4');
}


function setup() {

  let canvas = createCanvas(854, 480);
  canvas.parent('video1');
  background(128, 0, 128);
  video.volume(0);
  video.size();
  video.loop();
  video.hide();

  detector.detect(video, gotDetections);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }

  persons = [];

  for (let i = 0; i < results.length; i++) {
    if (results[i].label == "person")
      persons.push(results[i]);
  }

  detector.detect(video, gotDetections);
}



function draw() {
  image(video.get(), 0, 0);

  let redboxes = 0;
  for (let i = 0; i < persons.length; i++) {

    var isRed = false;
    strokeWeight(2);
    let x1 = persons[i].x + persons[i].width / 2;
    let y1 = persons[i].y + persons[i].height / 2;
    for (let j = 0; j < persons.length; j++) {

      if (i == j)
        continue;

      let x2 = persons[j].x + persons[j].width / 2;

      let y2 = persons[j].y + persons[j].height / 2;

      let d = dist(x1, y1, x2, y2);

      if (d < ((persons[i].width + persons[j].width) / 2) + 20) {
        isRed = true;
        stroke(255, 0, 0, 80);
        line(x1, y1, x2, y2);
      }

    }

    strokeWeight(3);
    noFill();

    if (isRed) {
      redboxes++;
      stroke(255, 0, 0);
    } else {
      stroke(0, 255, 0);
    }

    rect(persons[i].x, persons[i].y, persons[i].width, persons[i].height);

  }

  fetch('/cctv1.html', {
      method: 'POST',
      body: JSON.stringify({
        count: persons.length,
        violations: redboxes,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      if (response.ok) {
        console.log(persons.length);
      }
    });
}

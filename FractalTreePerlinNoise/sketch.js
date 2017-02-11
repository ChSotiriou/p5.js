var a;
var xoff;
var st = 0;
var inc = 0.01;
var stInc = 0.0005;
var cT = 0;

var speed;
var hidden = false;
var p;

var canvas;

function setup() {
  canvas = createCanvas(1000, 800);
  canvas.position(displayWidth / 2 - width / 2, displayHeight / 2 - height / 2);
  colorMode(HSB);

  speed = createSlider(0, 180, 0, 1);
  speed.position(10, 10);

  p = createP();
  p.position(10, 20);

  a = 0;
  make();
}

function draw() {
  if (millis() - cT > 500) {
    cT = millis();
    if (a != speed.value()) make();
  }
}

function make() {
  background(20);
  strokeWeight(4);
  translate(width / 2, height);

  a = speed.value();
  p.html(a);

  branch(height / 2.96);
}

function branch(len) {
  stroke(100);
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(radians(a));
    branch(len * 0.67);
    pop();

    push();
    rotate(radians(-a));
    branch(len * 0.67);
    pop();
  }
}

function keyPressed() {
  if (key == ' ') make();
  else {
    if (hidden) {
      hidden = false;
      speed.show();
      p.show();
    } else {
      hidden = true;
      speed.hide();
      p.hide();
    }
  }
}

var a;
var xoff;
var st = 0;
var inc = 0.01;
var stInc = 0.0005;
var cT = 0;

var input;
var hidden = false;

var canvas;

function setup() {
  canvas = createCanvas(1000, 800);
  canvas.position(displayWidth / 2 - width / 2, displayHeight / 2 - height / 2);
  colorMode(HSB);

  input = createInput('60');
  input.changed(make);
  input.position(10, 10);

  make();
}

function make() {
  background(20);
  strokeWeight(4);
  translate(width / 2, height);

  a = input.value();

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
  if (key == 'h' || key == 'H') {
    if (hidden) {
      hidden = false;
      input.show();
    } else {
      hidden = true;
      input.hide();
    }
  }
}

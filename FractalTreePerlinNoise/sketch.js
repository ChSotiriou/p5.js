var a;
var xoff;
var st = 0;
var inc = 0.01;
var stInc = 0.0005;
var cT = 0;

var input;
var colorT;

var randomR;

var hidden = false;

var canvas;

function setup() {
  canvas = createCanvas(1000, 800);
  canvas.position(displayWidth / 2 - width / 2, displayHeight / 2 - height / 2);
  colorMode(RGB);

  input = document.getElementById("angle");
  input.value = '60';
  input.onchange = make;

  colorT = document.getElementById("colT");
  colorT.onchange = make;
  colorT.value = "#ffffff";

  colorB = document.getElementById("colB");
  colorB.onchange = make;
  colorB.value = "#333333";

  make();
}

function make() {
  background(colorB.value);
  document.body.style.backgroundColor = colorB.value;
  stroke(colorT.value);

  strokeWeight(4);
  translate(width / 2, height);

  a = input.value;

  branch(height / 2.96);
}

function branch(len) {
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
      input.style.visibility = "visible";
      colorT.style.visibility = "visible";
      colorB.style.visibility = "visible";

    } else {
      hidden = true;
      input.style.visibility = "hidden";
      colorT.style.visibility = "hidden";
      colorB.style.visibility = "hidden";
    }
  }
}

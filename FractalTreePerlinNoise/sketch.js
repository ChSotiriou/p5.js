var a;
var xoff;
var st = 0;
var inc = 0.01;
var stInc = 0.0005;
var cT = 0;

var input;
var colorT;
var colorB;
var strokeW;
var lSlider;

var eClass;
var texts;

var randomR;

var hidden = false;

var canvas;

function setup() {
  canvas = createCanvas(1000, 800);
  canvas.position(
    displayWidth / 2 - width / 2,
    displayHeight / 2 - height / 2
  );
  colorMode(RGB);

  eClass = document.getElementsByClassName("input");
  texts = document.getElementsByClassName("text");

  input = document.getElementById("angle");
  input.value = '60';
  input.onchange = make;

  strokeW = document.getElementById("strokeW");
  strokeW.onchange = make;

  lSlider = document.getElementById("minS");
  lSlider.onchange = make;

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

  for (var i = 0; i < texts.length; i++) {
    texts[i].style.color = colorT.value;
  }

  strokeWeight(strokeW.value);
  translate(width / 2, height);

  a = input.value;

  branch(height / 2.96);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > lSlider.value) {
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
      for (var i = 0; i < eClass.length; i++) {
        eClass[i].hidden = false;
      }

    } else {
      hidden = true;
      for (var i = 0; i < eClass.length; i++) {
        eClass[i].hidden = true;
      }
    }
  }
}

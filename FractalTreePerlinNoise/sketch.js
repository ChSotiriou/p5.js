var a;
var xoff;
var st = 0;
var inc = 0.01;
var stInc = 0.0005;
var cT = 0;

var input;
var sliderR;
var sliderG;
var sliderB;

var sliderRB;
var sliderGB;
var sliderBB;

var hidden = false;

var canvas;

function setup() {
  canvas = createCanvas(1000, 800);
  canvas.position(displayWidth / 2 - width / 2, displayHeight / 2 - height / 2);
  colorMode(RGB);

  input = createInput('60');
  input.changed(make);
  input.position(10, 10);

  sliderR = createSlider(0, 255, 255, 1);
  sliderR.changed(make);
  sliderR.position(10, 40);

  sliderG = createSlider(0, 255, 255, 1);
  sliderG.changed(make);
  sliderG.position(10, 70);

  sliderB = createSlider(0, 255, 255, 1);
  sliderB.changed(make);
  sliderB.position(10, 100);

  sliderRB = createSlider(0, 255, 255, 1);
  sliderRB.changed(make);
  sliderRB.position(10, 140);

  sliderGB = createSlider(0, 255, 255, 1);
  sliderGB.changed(make);
  sliderGB.position(10, 170);

  sliderBB = createSlider(0, 255, 255, 1);
  sliderBB.changed(make);
  sliderBB.position(10, 200);

  make();
}

function make() {
  var rB = sliderRB.value();
  var gB = sliderGB.value();
  var bB = sliderBB.value();

  var col = color(rB, gB, bB);
  var hx = "#" + hex(rB, 2) + hex(gB, 2) + hex(bB, 2);
  document.body.style.backgroundColor = hx;
  background(col);

  var r = sliderR.value();
  var g = sliderG.value();
  var b = sliderB.value();

  stroke(r, g, b);

  strokeWeight(4);
  translate(width / 2, height);

  a = input.value();

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
      input.show();

      sliderR.show();
      sliderG.show();
      sliderB.show();

      sliderRB.show();
      sliderGB.show();
      sliderBB.show();
    } else {
      hidden = true;
      input.hide();

      sliderR.hide();
      sliderG.hide();
      sliderB.hide();

      sliderRB.hide();
      sliderGB.hide();
      sliderBB.hide();
    }
  }
}

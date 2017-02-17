// Memorize the Cards
// Made by: Christos Soteriou

// Find The Pairs

var cards = [];
var touch = false;
var completed = false;
var cT = 0;
var cTturn = 0;
var turnedCards = [];
var aTurned = 0;
var toTurn = false;

var cTstart = 0;
var cTtouch = 0;
var cTrestart = 0;

var attempts = 0;
var attemptsP;

var minutes = 0;
var seconds = 0;
var timeP;

var start = false;
var pulseS = false;

var startP;
var nameP;
var myNameP;

var btnRestart;

var rectPos;

var cP = 0;

function setup() {
  createCanvas(849.5, 525);
  colorMode(RGB);
  rectMode(CENTER);

  rectPos = createVector(width / 2, 25);

  btnRestart = createButton('Restart');
  btnRestart.position(rectPos.x - 36.5, rectPos.y - 6);
  btnRestart.mousePressed(restart);
  btnRestart.style('font-size', '25');
  btnRestart.style('background-color', 'transparent');
  btnRestart.style('border', '0');
  btnRestart.style('outline', 'none');
  btnRestart.hide();

  timeP = createElement('h1');
  timeP.style('font-size', '25px');
  timeP.position(27.5, 3);

  attemptsP = createElement('h1');
  attemptsP.style('font-size', '25px');
  attemptsP.position(width - 120, 3);

  startP = createElement('h1');
  nameP = createElement('h1');
  myNameP = createElement('h1');

  startP.position((width / 2) - 123.25, (height / 2) - 12.5);
  startP.style('font-size', '30px');
  startP.html('Press Any Key to Start');

  nameP.position((width / 2) - 108.25, (height / 2) - 112.5);
  nameP.style('font-size', '30px');
  nameP.html('Memorize the Cards');

  myNameP.position((width / 2) - 158.25, (height / 2) - 62.5);
  myNameP.style('font-size', '30px');
  myNameP.html('Made by: Christos Soteriou');
}

function draw() {
  background(204);

  touch4Start();

  if (start && millis() - cTstart > 200) {
    if (pulseS && millis() - cP > 5000) {
      pulseS = false;
      for (var i = 0; i < cards.length; i++) {
        cards[i].turned = false;
      }
      cTstart = millis();
    }
    push();
    noFill();
    stroke(0);
    strokeWeight(3);
    rect(rectPos.x, rectPos.y, 100, 35);
    pop();

    btnRestart.show();
    timeP.show();
    attemptsP.show();

    if (!allTurned()) {
      seconds = floor((millis() - cTstart) / 1000) - minutes * 60;
      minutes = floor(floor((millis() - cTstart) / 1000) / 60);
    }
    if (seconds < 10) {
      timeP.html('Time: ' + minutes + ':0' + seconds);
    } else {
      timeP.html('Time: ' + minutes + ':' + seconds);
    }

    attemptsP.html('Moves: ' + attempts);

    Turn();

    var pressedCard = cardPressed();
    if (pressedCard > -1 && !cards[pressedCard].turned) {
      cards[pressedCard].turned = true;
      turnedCards[aTurned] = pressedCard;
      aTurned++;
    }
    if (aTurned == 2) {
      attempts++;
      if (cards[turnedCards[0]].color == cards[turnedCards[1]].color) {
        aTurned = 0;
        turnedCards[0] = null;
        turnedCards[1] = null;
      } else {
        toTurn = true;
        cTturn = millis();
        aTurned = 0;
      }

    }
    for (var i = 0; i < cards.length; i++) {
      cards[i].render();
      // cards[i].turned = true;
    }
  }
}

function createCardTable() {
  completed = false;
  var colors = [];
  var hasColor = [];
  for (var i = 0; i < 14; i++) {
    colors[i] = false;
  }
  for (var i = 0; i < 14; i++) {
    hasColor[i] = false;
  }
  var cX = 75;
  var cY = 100;

  for (var i = 0; i < 28; i++) {
    var color = getColor(colors);
    if (!hasColor[color]) {
      hasColor[color] = true;
    } else {
      colors[color] = true;
    }
    cards[i] = new Card(cX, cY, color);
    cX += 116 + 2 * (1 / 3);
    if ((i + 1) % 7 == 0) {
      cX = 75;
      cY += 116 + 2 * (1 / 3);
    }
  }
  completed = true;
  for (var i = 0; i < cards.length; i++) {
    cards[i].turned = true;
  }
  pulseS = true;
  cP = millis();
}

function getColor(array) {
  do {
    c = floor(random(0, 14));
  } while (array[c]);
  return c;
}

function cardPressed() {
  if (((mouseIsPressed && mouseButton == LEFT) || touch) && millis() - cT > 200 && completed && millis() - cTturn > 800) {
    for (var i = 0; i < cards.length; i++) {
      var d = dist(mouseX, mouseY, cards[i].pos.x, cards[i].pos.y);
      var dt = dist(touchX, touchY, cards[i].pos.x, cards[i].pos.y);
      if (d < cards[i].r || dt < cards[i].r) {
        return i;
      }
    }
    return -1;
  } else {
    return -1;
  }
}

function Turn() {
  if (toTurn && millis() - cTturn > 800) {
    cards[turnedCards[0]].turned = false;
    cards[turnedCards[1]].turned = false;

    turnedCards[0] = null;
    turnedCards[1] = null;

    toTurn = false;
  }
}

function touchStarted() {
  if (millis() - cTtouch > 500) {
    touch = true;
    cTtouch = millis();
  }
}

function touchEnded() {
  touch = false;
}

function keyPressed() {
  if (!start && millis() - cTrestart > 200) {
    startF();
  }
}

function startF() {

  startP.hide();
  nameP.hide();
  myNameP.hide();

  createCardTable();

  start = true;

  cTstart = millis();
}

function allTurned() {
  for (var i = 0; i < cards.length; i++) {
    if (!cards[i].turned) {
      return false;
    }
  }
  return true;
}

function touch4Start() {
  if (touch && !start && millis() - cTrestart > 200) {
    startF();
  }
}

function restart() {

  start = false;

  btnRestart.hide();

  startP.show();
  nameP.show();
  myNameP.show();

  timeP.hide();
  attemptsP.hide();

  aTurned = 0;
  attempts = 0;

  cTrestart = millis();

  touch = false;

  createCardTable();

}

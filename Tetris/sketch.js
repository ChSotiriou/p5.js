const scl = 40;
const numOfShapes = 7;
const mpmStart = 1000;

var score = 0;
var pElement;

var pGame;
var pName;
var pStart;

var millisPerMove = mpmStart;

var cols;
var rows;

var lastBlock;
var blocks = [];

var start = false;

function setup() {
  createCanvas(480, 680);
  cols = floor(width / scl);
  rows = floor(height / scl);

  pElement = createP('Score: ');
  pElement.style('font-size', 36);
  pElement.position(25 + width, -20);
  pElement.hide();

  pGame = createP('Tetris');
  pGame.position(width / 2 - 50, 50);
  pGame.style('font-size', 50);

  pName = createP('by Christos Soteriou');
  pName.position(width / 2 - 190, 150);
  pName.style('font-size', 50);

  pStart = createP('Press any key to start');
  pStart.position(width / 2 - 200, 250);
  pStart.style('font-size', 50);

  lastBlock = new Block();
  blocks.push(lastBlock);
}

function draw() {
  if (start) {
    background(51);

    score = blocks.length - 1;
    pElement.html('Score: ' + score);

    for (var i = 0; i < cols * scl; i += scl) {
      for (var j = 0; j < rows * scl; j += scl) {
        noFill();
        stroke(255, 50);
        rect(i, j, scl, scl);
      }
    }
    lastBlock = blocks[blocks.length - 1];

    if (lastBlock.getLanded()) {
      addBlock();
    }

    for (var i = 0; i < blocks.length; i++) {
      blocks[i].render();
      if (blocks[i].checkLose()) {
        lose();
        return;
      }
    }
    lastBlock.update();
  } else {
    background(204);

  }
}

function lose() {
  console.log('>>> YOU LOST <<<');
  blocks = [];
  lastBlock = new Block();
  blocks.push(lastBlock);
}

function addBlock() {
  blocks.push(new Block());
}

function keyPressed() {
  if (!start) {
    pElement.show();
    pGame.hide();
    pName.hide();
    pStart.hide();
    start = true;
  }
  if (key === 'q' || key === 'Q') {
    lastBlock.changeAngle(-1);
  } else if (key === 'e' || key === 'E') {
    lastBlock.changeAngle(1);
  } else if (key === 'a' || key === 'A') {
    lastBlock.setMotion(-1);
  } else if (key === 'd' || key === 'D') {
    lastBlock.setMotion(1);
  } else if (key === 's' || key === 'S') {
    millisPerMove = 50;
  }
  //   else if (key == ' ') noLoop();
  //   else if (key == 'M') loop();
}

function keyReleased() {
  if (key === 'a' || key === 'A' || key === 'd' || key === 'D') {
    lastBlock.setMotion(0);
  } else if (key === 's' || key === 'S') {
    millisPerMove = mpmStart;
  }
}

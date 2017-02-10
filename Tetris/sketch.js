const scl = 40;
const numOfShapes = 7;
const mpmStart = 1000;

var score = 0;
var pElement;

var millisPerMove = mpmStart;

var cols;
var rows;

var lastBlock;
var blocks = [];

function setup() {
  createCanvas(480, 680);
  cols = floor(width / scl);
  rows = floor(height / scl);

  pElement = createP('Score: ');
  pElement.style('font-size', 36);
  pElement.position(25 + width, -20);

  lastBlock = new Block();
  blocks.push(lastBlock);
}

function draw() {
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

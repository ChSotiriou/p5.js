// Space Invaters
// Made by: Christos Soteriou

// The Classic Space Invaders Game

var ship;
var bullets = [];
var enemiesBullets = [];
var enemies = [];
var dir = -1;

var enemiesKilled = 0;

var roundC = 1;
var score = 0;

var lives = 2;

var numPerRow = 9;
var enemyNum = numPerRow * 4;

var roundP;
var scoreP;
var livesP;

var nameP;
var startP;
var myNameP;

var start = false;

var enemyX, enemyY;

var changeTimeR = 0;

function setup() {
  createCanvas(700, 600);
  frameRate(10);
  ship = new Ship();

  background(200);

  roundP = createElement('h1');
  scoreP = createElement('h1');
  livesP = createElement('h1');

  startP = createElement('h1');
  nameP = createElement('h1');
  myNameP = createElement('h1');

  startP.position((width / 2) - 130, (height / 2));
  startP.html('Press Any Key to Start');

  nameP.position((width / 2) - 75, (height / 2) - 170);
  nameP.html('Space Invaders');

  myNameP.position((width / 2) - 160, (height / 2) - 120);
  myNameP.html('Made by: Christos Soteriou');

  generateEnemies(enemyNum);
}

function draw() {

  if (start) {
    startP.hide();
    nameP.hide();
    myNameP.hide();

    background(51);

    ship.show();
    ship.move(dir);

    roundP.html('Round: ' + roundC);
    roundP.position(width + 30, 0);
    scoreP.html('Score: ' + score);
    scoreP.position(width + 30, 50);
    livesP.html('Lives: ' + lives);
    livesP.position(width + 30, 100);

    for (var i = 0; i < bullets.length; i++) {

      bullets[i].show();
      bullets[i].update();
      bullets[i].dOut();

      for (var j = 0; j < enemiesBullets.length; j++) {
        if (bullets[i].hit(enemiesBullets[j])) {
          bullets[i].toDelete = true;
          enemiesBullets[j].toDelete = true;
        }

      }

      for (var j = 0; j < enemies.length; j++) {
        if (bullets[i].hit(enemies[j], 'e')) {
          bullets[i].toDelete = true;
          enemies.splice(j, 1);
          enemiesKilled++;
          score++;
        }
      }
    }

    for (var i = 0; i < enemiesBullets.length; i++) {

      enemiesBullets[i].show();
      enemiesBullets[i].update();
      enemiesBullets[i].dOut();

      if (enemiesBullets[i].hit(ship, 's')) {
        enemiesBullets[i].toDelete = true;
        death();
      }
    }

    for (var i = enemiesBullets.length - 1; i > 0; i--) {
      if (enemiesBullets[i].toDelete) {
        enemiesBullets.splice(i, 1);
      }
    }
    for (var i = 0; i < enemies.length; i++) {

      enemies[i].show();
      enemies[i].moveE();
      if (enemies[i].checkOut()) {
        death();
      }

      if (randomShoot()) {
        enemiesBullets.push(new Bullet(enemies[i].pos, 1, 'e'));
      }

      if (enemies[i].edge()) {
        for (var j = 0; j < enemies.length; j++) {
          enemies[j].down();
        }
      }
      if (enemies[i].hit(ship)) {
        death();
      }
    }

    for (var i = bullets.length - 1; i >= 0; i--) {
      if (bullets[i].toDelete) {
        bullets.splice(i, 1);
      }
    }

    if (enemies.length == 0) {
      for (var i = bullets.length - 1; i >= 0; i--) {
        bullets.splice(i, 1);
      }
      for (var i = enemiesBullets.length - 1; i >= 0; i--) {
        enemiesBullets.splice(i, 1);
      }
      enemiesKilled = 0;
      roundC++;
      generateEnemies(enemyNum);
    }
  }
}

function death() {
  if (lives == 0) {
    score = 0;
    roundC = 1;
    lives = 2;
    enemiesKilled = 0;
    generateEnemies(enemyNum);
  } else {
    lives--;
    enemiesKilled = 0;
  }

  for (var j = bullets.length - 1; j >= 0; j--) {
    bullets.splice(j, 1);
  }

  for (var j = enemiesBullets.length - 1; j >= 0; j--) {
    enemiesBullets.splice(j, 1);
  }
}

function generateEnemies(num) {
  enemyX = 55;
  enemyY = 25;
  for (var i = 0; i < num; i++) {
    enemies[i] = new Enemy(enemyX, enemyY, roundC);
    enemyX += 70;
    if ((i + 1) % numPerRow == 0) {
      enemyX = 55;
      enemyY += 60;
    }
  }
}

function randomShoot() {
  rpmVal = map(roundC, 1, 25, 3, 1.5);
  return floor(random(0, pow(10, rpmVal)) < 1);
}

function keyPressed() {
  if (!start) {
    start = true;
  }
  if (keyCode == LEFT_ARROW) {
    dir = 0;
  }
  if (keyCode == RIGHT_ARROW) {
    dir = 1;
  }
  if (key === ' ' && millis() - changeTimeR > 500) {
    changeTimeR = millis();
    bullets.push(new Bullet(ship.pos, -1, 's'));
  }
}

function keyReleased() {
  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
    dir = -1;
  }
}

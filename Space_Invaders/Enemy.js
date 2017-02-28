// Space Invaters
// Made by: Christos Soteriou

// The Classic Space Invaders Game

function Enemy(x, y, round) {
  this.pos = createVector(x, y);
  this.vel = 3;
  this.changeTime = 0;
  this.dir = 1;

  this.downNum = 20;
  this.r = 20;

  this.show = function () {
    fill(255, 0, 100);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  };

  this.edge = function () {
    if (this.pos.x > width - this.r || this.pos.x < 0 + this.r) {
      return true;
    } else {
      return false;
    }
  };

  this.moveE = function () {
    this.pos.x += this.dir * this.vel;
  };

  this.down = function () {
    this.pos.y += this.downNum;
    this.dir *= -1;
  };

  this.checkOut = function () {
    if (this.pos.y > height - this.r) {
      return true;
    } else {
      return false;
    }
  };

  this.hit = function (ship) {
    this.d = dist(this.pos.x, this.pos.y, ship.pos.x, ship.pos.y);
    this.d2 = dist(this.pos.x, this.pos.y, ship.posB.x, ship.posB.y);
    this.d3 = dist(this.pos.x, this.pos.y, ship.posC.x, ship.posC.y);
    if (this.d <= this.r || this.d2 <= this.r || this.d3 <= this.r) {
      return true;
    } else {
      return false;
    }
  };
};

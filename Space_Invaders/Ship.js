// Space Invaters
// Made by: Christos Soteriou

// The Classic Space Invaders Game
function Ship() {
  this.pos = createVector(width / 2, height - 50);
  this.posB = createVector(this.pos.x - 20, height);
  this.posC = createVector(this.pos.x + 20, height);

  this.hitbox_XY = createVector(this.pos.x - 20, this.pos.y);
  this.hitbox_WH = createVector(40, 50);

  this.speed = 15;

  this.show = function () {
    fill(255);
    noStroke();
    triangle(this.pos.x, this.pos.y,
      this.posB.x, this.posB.y,
      this.posC.x, this.posC.y);
  }

  this.move = function (dir) {
    if (dir == 1 && this.posC.x < width) { // Move Right
      this.pos.x += this.speed;
      this.posB.x += this.speed;
      this.posC.x += this.speed;
      this.hitbox_XY.x += this.speed;
    } else if (dir == 0 && this.posB.x > 0) {
      this.pos.x -= this.speed;
      this.posB.x -= this.speed;
      this.posC.x -= this.speed;
      this.hitbox_XY.x -= this.speed;
    }
  }
}

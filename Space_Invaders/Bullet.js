// Space Invaters
// Made by: Christos Soteriou

// The Classic Space Invaders Game

function Bullet(pos_, dirY, ty) {
  this.pos = createVector(pos_.x, pos_.y);
  this.vel = 33;
  this.toDelete = false;
  this.r = 5;
  this.dir = dirY;
  this.type = ty;

  this.dOut = function () {
    if (this.pos.y < 0 || this.pos.y >= height) {
      this.toDelete = true;
    } else {
      this.toDelete = false;
    }
  }

  this.update = function () {
    for (var i = 0; i < this.vel; i++) {
      this.pos.y += this.dir;
    }
  }

  this.show = function () {
    if (this.type === 'e') {
      fill(255, 100, 10);
    } else {
      fill(10, 100, 255);
    }
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  this.hit = function (obj, type) {
    if (type === 'e') {
      this.d = dist(this.pos.x, this.pos.y, obj.pos.x, obj.pos.y);
      var hitArea = obj.r + this.r;
      return this.d <= hitArea;

    } else if (type === 's') {

      return this.rect_point_intersection(obj.hitbox_XY, obj.hitbox_WH, this.pos);
    }
  }

  this.rect_point_intersection = function (xy, wh, p) {
    pA = createVector(xy.x, xy.y);
    pB = createVector(xy.x + wh.x, xy.y);
    pC = createVector(xy.x + wh.x, xy.y + wh.y);
    pD = createVector(xy.x, xy.y + wh.y);

    return (
      p.x >= pA.x && p.x <= pB.x &&
      p.y >= pA.y && p.y <= pD.y
    );
  }
}

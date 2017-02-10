function Block() {
  var shape = new ShapeManager();
  var pos = new p5.Vector(cols / 2 - 1, -1);

  var cT = 0;
  var cT2 = 0;

  var horizontalMotion = 0;

  var landed = false;

  this.render = function () {
    shape.render(pos);
  }

  this.update = function () {
    this.moveVertical();
    this.moveHorizontal();
  }

  this.checkLose = function () {
    return landed && pos.y <= 0;
  }

  this.setMotion = function (dir) {
    horizontalMotion = dir;
  }

  this.getLanded = function () {
    return landed;
  }

  this.returnEdges = function (t) {
    return shape.getEdges(t, pos);
  }

  this.changeAngle = function (dir) {
    if (!this.rotationOut(dir)) shape.changeAngle(dir * 90);
  }

  this.rotationOut = function (dir) {
    var nAngle = shape.getAngle() + dir * 90;
    var w = shape.getSize('w', nAngle) / scl;
    var h = shape.getSize('h', nAngle) / scl;

    var b = pos.x < 0 || pos.x > cols - w || pos.y > rows - h;
    return b;
  }

  this.touchingBlockSide = function (dir, all) {
    if (dir != 0) {
      var thisEdges = this.returnEdges('v');
      if (dir == -1) { // LEFT
        var wantedEdge = getWantedEdge('l', thisEdges);
      } else if (dir == 1) { // RIGHT
        var wantedEdge = getWantedEdge('r', thisEdges);
      }
      for (var i = 0; i < all.length; i++) {
        if (all[i] != this) {
          var otherEdges = all[i].returnEdges('v');
          if (checkIfTouchingVerticle(wantedEdge, otherEdges)) return true;
        }
      }
    }
    return false;
  }

  var checkIfTouchingVerticle = function (wanted, otherEdges) {

    var wantedLowestY = min(wanted[0].y, wanted[1].y);
    var wantedHighestY = max(wanted[0].y, wanted[1].y);

    for (var i = 0; i < otherEdges.length; i++) {
      var edge = otherEdges[i];

      if (edge[0].x == wanted[0].x) {

        var otherLowestY = min(edge[0].y, edge[1].y);
        var otherHighestY = max(edge[0].y, edge[1].y);

        var b1 = wantedLowestY >= otherLowestY && wantedLowestY < otherHighestY;
        var b2 = wantedHighestY > otherLowestY && wantedHighestY <= otherHighestY;
        var b3 = wantedLowestY < otherLowestY && wantedHighestY > otherHighestY;

        if (b1 || b2 || b3) {
          return true;
        }
      }
    }
    return false;
  }

  var getWantedEdge = function (t, edges) {
    if (t == 'l') {
      var winner = edges[0];
      for (var i = 1; i < edges.length; i++) {
        if (edges[i][0].x < winner[0].x) winner = edges[i];
      }
    } else if (t == 'r') {
      var winner = edges[0];
      for (var i = 1; i < edges.length; i++) {
        if (edges[i][0].x > winner[0].x) winner = edges[i];
      }
    }
    return winner;
  }

  this.landedOnBlock = function (all) {
    var thisEdges = this.returnEdges('h');
    for (var i = 0; i < all.length; i++) {
      other = all[i];
      if (this != other) {
        otherEdges = other.returnEdges('h');
        if (checkIfTouchingHorizontal(thisEdges, otherEdges)) return true;
      }
    }
    return false;
  }

  var checkIfTouchingHorizontal = function (edgesThis, edgesOther) {
    for (var i = 0; i < edgesThis.length; i++) {
      for (var j = 0; j < edgesOther.length; j++) {

        if (edgesThis[i][0].y == edgesOther[j][0].y) {
          var thisLowestX = min(edgesThis[i][0].x, edgesThis[i][1].x);
          var thisHighestX = max(edgesThis[i][0].x, edgesThis[i][1].x);

          var otherLowestX = min(edgesOther[j][0].x, edgesOther[j][1].x);
          var otherHighestX = max(edgesOther[j][0].x, edgesOther[j][1].x);

          var b1 = thisLowestX >= otherLowestX && thisLowestX < otherHighestX;
          var b2 = thisHighestX > otherLowestX && thisHighestX <= otherHighestX;
          var b3 = thisLowestX < otherLowestX && thisHighestX > otherHighestX;

          if (b1 || b2 || b3) {
            return true;
          }
        }
      }
    }
    return false;
  }

  var atBottom = function () {
    var h = shape.getSize('h') / scl;
    if (pos.y + h >= rows) {
      return true;
    } else return false;
  }

  var atSides = function (t) {
    var w = shape.getSize('w') / scl;
    if (t == -1) return pos.x <= 0
    else if (t == 1) return pos.x + w >= cols;
  }

  this.moveVertical = function () {
    if (millis() - cT > millisPerMove) {
      cT = millis();
      pos.y++;
      landed = this.landedOnBlock(blocks) || atBottom();
    }
  }

  this.moveHorizontal = function () {
    if (millis() - cT2 > 100 && !atSides(horizontalMotion) && !this.touchingBlockSide(horizontalMotion, blocks)) {
      cT2 = millis();
      pos.x += horizontalMotion;
    }
  }
}

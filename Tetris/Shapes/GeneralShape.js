function GShape(_a0, _a90, _a180, _a270) {
  var angle = 0;
  var col = color(random(255), random(255), random(255));
  var shapeSize;

  var a0 = _a0;
  var a90 = _a90;
  var a180 = _a180;
  var a270 = _a270;

  this.render = function (pos) {
    var a;
    if (angle < 0) a = 360 + (angle % 360);
    else a = angle % 360;
    push();
    translate(pos.x * scl, pos.y * scl);
    fill(col);
    if (a == 0 || a == 360) {
      generateShape(a0);
    } else {
      switch (a) {
        case 90:
          generateShape(a90);
          break;

        case 180:
          generateShape(a180);
          break;

        case 270:
          generateShape(a270);
          break;

        default:
          console.log(a, "  ", angle);
      }
    }
    pop();
  }

  this.getAngle = function () {
    if (angle < 0) a = 360 + (angle % 360);
    else a = angle % 360;
    if (a == 360) a == 0;
    return a;
  }

  this.getVertices = function (a) {
    if (a == null) {
      if (angle < 0) a = 360 + (angle % 360);
      else a = angle % 360;
    }
    switch (a) {
      case 0:
        return a0.verts;
        break;

      case 360:
        return a0.verts;
        break;

      case 90:
        return a90.verts;
        break;

      case 180:
        return a180.verts;
        break;

      case 270:
        return a270.verts;
        break;

    }
  }

  this.incAngle = function (a) {
    angle += a;
  }

  this.calculateEdges = function (t, pos) {
    vert = this.getVertices();
    if (t == 'h') {
      return getHorizontalEdges(vert, pos);
    } else if (t == 'v') {
      return getVerticalEdges(vert, pos);
    }
  }

  this.getSize = function (t, a) {
    var v1 = new p5.Vector();
    if (a == null) v1 = shapeSize;
    else {
      if (a == 0 || a == 360) v1 = a0.size;
      else if (a == 90) v1 = a90.size;
      else if (a == 180) v1 = a180.size;
      else if (a == -90 || a == 270) v1 = a270.size;
      else {
        console.log('ERROR: ' + a);
      }
    }
    if (t == 'w') return v1.x;
    else if (t == 'h') return v1.y;
  }

  this.getRectPos = function (pos) {
    var a = this.getAngle();
    var rects = [];
    var blsArr;

    switch (a) {
      case 0:
        blsArr = a0.blocks;
        break;

      case 360:
        blsArr = a0.blocks;
        break;

      case 90:
        blsArr = a90.blocks;
        break;

      case 180:
        blsArr = a180.blocks;
        break;

      case 270:
        blsArr = a270.blocks;
        break;
    }

    for (var i = 0; i < blsArr.length; i++) {
      r = new p5.Vector(blsArr[i].x + pos.x * scl, blsArr[i].y + pos.y * scl)
      rects.push(r);
    }
    return rects;
  }

  var generateShape = function (vert) {
    shapeSize = vert.size;
    noStroke();
    for (var i = 0; i < vert.blocks.length; i++) {
      rect(vert.blocks[i].x, vert.blocks[i].y, scl, scl);
    }
  }

  var getHorizontalEdges = function (vert, pos) {
    var edges = [];
    for (var i = 0; i < vert.length; i++) {
      for (var j = 0; j < vert.length; j++) {

        if (vert[i] != vert[j]) {

          if (vert[i].y == vert[j].y) {

            if (!foundDuplicate(vert[i].x + pos.x * scl, vert[i].y + pos.y * scl, edges)) {
              if (vert[i].x < vert[j].x)
                edge = [
                  new p5.Vector(vert[i].x + pos.x * scl, vert[i].y + pos.y * scl),
                  new p5.Vector(vert[j].x + pos.x * scl, vert[j].y + pos.y * scl),
                ]
              else
                edge = [
                  new p5.Vector(vert[j].x + pos.x * scl, vert[j].y + pos.y * scl),
                  new p5.Vector(vert[i].x + pos.x * scl, vert[i].y + pos.y * scl),
                ]
              edges.push(edge);
            }
          }
        }
      }
    }
    return edges;
  }

  var getVerticalEdges = function (vert, pos) {
    var edges = [];
    for (var i = 0; i < vert.length; i++) {
      for (var j = 0; j < vert.length; j++) {

        if (vert[i] != vert[j]) {

          if (vert[i].x == vert[j].x) {

            if (!foundDuplicate(vert[i].x + pos.x * scl, vert[i].y + pos.y * scl, edges)) {
              if (vert[i].y < vert[j].y)
                edge = [
                  new p5.Vector(vert[i].x + pos.x * scl, vert[i].y + pos.y * scl),
                  new p5.Vector(vert[j].x + pos.x * scl, vert[j].y + pos.y * scl),
                ]
              else
                edge = [
                  new p5.Vector(vert[j].x + pos.x * scl, vert[j].y + pos.y * scl),
                  new p5.Vector(vert[i].x + pos.x * scl, vert[i].y + pos.y * scl),
                ]
              edges.push(edge);

            }
          }
        }
      }
    }
    return edges;
  }

  var foundDuplicate = function (vx, vy, a) {
    if (a == null) return false;
    for (var i = 0; i < a.length; i++) {
      if ((a[i][0].x == vx && a[i][0].y == vy) || (a[i][1].x == vx && a[i][1].y == vy)) {
        return true;
      }
    }
    return false;
  }

  var getLowestEdge = function (vertEdges) {
    winner = vertEdges[0];
    for (var i = 1; i < vertEdges.length; i++) {
      if (vertEdges[i][0].x < winner[0].x) winner = vertEdges[i];
    }
    return winner;
  }

  function includes(arr, obj) {
    return (arr.indexOf(obj) != -1);
  }
}

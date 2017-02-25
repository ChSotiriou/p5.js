function Shape2() {
  // Shapes
  var shape = {
    verts: [
      // -- --
      // -- --
      new p5.Vector(0, 0),
      new p5.Vector(2 * scl, 0),
      new p5.Vector(2 * scl, 2 * scl),
      new p5.Vector(0, 2 * scl)
    ],

    size: new p5.Vector(2 * scl, 2 * scl)
  };

  var gShape = new GShape(shape, shape, shape, shape);

  this.render = function (pos) {
    gShape.render(pos);
  }

  this.incAngle = function (a) {
    gShape.incAngle(a);
  }

  this.getAngle = function () {
    return gShape.getAngle();
  }

  this.getVertices = function (a) {
    return gShape.getVertices(a);
  }

  this.calculateEdges = function (t, pos) {
    return gShape.calculateEdges(t, pos);
  }

  this.getSize = function (t, a) {
    return gShape.getSize(t, a);
  }

  this.getRectPos = function (pos) {
    return gShape.getRectPos(pos);
  }
}

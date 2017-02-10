function Shape4() {
  // Shapes
  {
    var angle0Vert = [
      // -- -- -- --
      new p5.Vector(0, 0),
      new p5.Vector(4 * scl, 0),
      new p5.Vector(4 * scl, scl),
      new p5.Vector(0, scl),
      new p5.Vector(4 * scl, scl)
    ];

    var angle90Vert = [
      // --
      // --
      // --
      // --
      new p5.Vector(0, 0),
      new p5.Vector(scl, 0),
      new p5.Vector(scl, 4 * scl),
      new p5.Vector(0, 4 * scl),
      new p5.Vector(scl, 4 * scl)
    ];
  }

  var gShape = new GShape(angle0Vert, angle90Vert, angle0Vert, angle90Vert);

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
}

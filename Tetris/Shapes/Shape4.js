function Shape4() {
  // Shapes
  {
    var angle0 = {
      blocks: [
        // -- -- -- --
        new p5.Vector(0, 0),
        new p5.Vector(scl, 0),
        new p5.Vector(2 * scl, 0),
        new p5.Vector(3 * scl, 0)
      ],

      verts: [
        new p5.Vector(0, 0),
        new p5.Vector(4 * scl, 0),
        new p5.Vector(4 * scl, scl),
        new p5.Vector(0, scl),
      ],

      size: new p5.Vector(4 * scl, scl)
    };

    var angle90 = {
      blocks: [
        // --
        // --
        // --
        // --
        new p5.Vector(0, 0),
        new p5.Vector(0, scl),
        new p5.Vector(0, 2 * scl),
        new p5.Vector(0, 3 * scl)
      ],

      verts: [
        new p5.Vector(0, 0),
        new p5.Vector(scl, 0),
        new p5.Vector(scl, 4 * scl),
        new p5.Vector(0, 4 * scl)
      ],

      size: new p5.Vector(scl, 4 * scl)
    };
  }

  var gShape = new GShape(angle0, angle90, angle0, angle90);

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

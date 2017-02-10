function ShapeManager() {
  var shape;
  var _n = floor(random(numOfShapes));
  var vertices = []

  switch (_n) {
    case 0:
      shape = new Shape0();
      break;
    case 1:
      shape = new Shape1();
      break;
    case 2:
      shape = new Shape2();
      break;
    case 3:
      shape = new Shape3();
      break;
    case 4:
      shape = new Shape4();
      break;
    case 5:
      shape = new Shape5();
      break;
    case 6:
      shape = new Shape6();
      break;
  }

  this.getVertices = function (a) {
    return shape.getVertices(a);
  }

  this.render = function (pos) {
    shape.render(pos);
  }

  this.changeAngle = function (a) {
    shape.incAngle(a);
  }

  this.getEdges = function (t, pos) {
    return shape.calculateEdges(t, pos);
  }

  this.getSize = function (t, a) {
    return shape.getSize(t, a);
  }

  this.getAngle = function () {
    return shape.getAngle();
  }
}

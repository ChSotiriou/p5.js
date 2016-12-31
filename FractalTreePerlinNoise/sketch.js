var a;
var xoff;
var st = 0;

function setup( ) {
   createCanvas(600, 400);
   colorMode(HSB);
   a = 0;
}

function draw( ) {
   background(20);
   strokeWeight(4);
   translate(width/2, height);
   xoff = st;

   branch(125);

   st += 0.001;
}

function branch(len) {
   stroke(100);
   line(0, 0, 0, -len);
   translate(0, -len);
   if(len > 4) {
      a = noise(xoff) * PI/2;
      push( );
      rotate(a);
      branch(len * 0.67);
      pop( );

      push( );
      rotate(-a);
      branch(len * 0.67);
      pop( );
      xoff += 0.01;
   }
}

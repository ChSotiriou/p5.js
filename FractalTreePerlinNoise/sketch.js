var a;
var xoff;
var st = 0;
var inc = 0.01;
var stInc = 0.0005;

var speed;
var hidden = false;

function setup( ) {
   createCanvas(1000, 800);
   colorMode(HSB);

   speed = createSlider(0, 0.1, 0, 0.0001);
   speed.position(10, 10);

   a = 0;
}

function draw( ) {
   background(20);
   strokeWeight(4);
   translate(width/2, height);

   stInc = speed.value( );

   xoff = st;

   branch(height/2.96);

   st += stInc;
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
      xoff += inc;
   }
}

function keyPressed( ) {
   if(hidden) {
      hidden = false;
      speed.show( );
   }
   else {
      hidden = true;
      speed.hide( );
   }
}

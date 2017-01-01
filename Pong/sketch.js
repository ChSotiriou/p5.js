var p1, p2;
var ball;

var scoreP1 = 0;
var scoreP2 = 0;

var scoreP1P, scoreP2P;

function setup( ) {
   createCanvas(1100, 560);
   p1 = new Player( 1);
   p2 = new Player(-1);

   ball = new Ball(1);

   scoreP1P = createElement('h1');
   scoreP1P.position(width/2 - 70, -30);
   scoreP1P.style('font-size', '50pt');
   scoreP1P.style('color', '#FFF');

   scoreP2P = createElement('h1');
   scoreP2P.position(width/2 + 60, -30);
   scoreP2P.style('font-size', '50pt');
   scoreP2P.style('color', '#FFF');
}

function draw( ) {
   background(0);
   scoreP1P.html(scoreP1);
   scoreP2P.html(scoreP2);
   push( );
   for(var i = 10; i < height; i+=20) {
      strokeWeight(4);
      stroke(255);
      point(width/2, i);
   }
   pop( );

   win( );

   p1.render( );
   p2.render( );
   ball.render( );

   p1.update( );
   p2.update( );
   ball.update( );

   p1.edge( );
   p2.edge( );
   ball.edge( );

   p1.hitBall(ball);
   p2.hitBall(ball);
}

function win( ) {
   if(ball.scorePoint( ) == 1) {
      scoreP1++;
      ball = new Ball( 1);
   }
   else if(ball.scorePoint( ) == -1) {
      scoreP2++;
      ball = new Ball(-1);
   }
}

function keyPressed( ) {
   if (key === 'w' || key === 'W') {
      p1.vel.y = -1;
   }
   else if (key === 's' || key === 'S') {
      p1.vel.y =  1;
   }

   if (keyCode == UP_ARROW) {
      p2.vel.y = -1;
   }
   else if (keyCode == DOWN_ARROW) {
      p2.vel.y =  1;
   }
}

function keyReleased( ) {
   if (key === 'w' || key === 'W' || key === 's' || key === 'S') {
      p1.vel.y = 0;
   }

   if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
      p2.vel.y = 0;
   }
}

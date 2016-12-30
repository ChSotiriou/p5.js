// Memorize the Cards
// Made by: Christos Soteriou

// Find The Pairs

var cards = [];
var touch = false;
var completed = false;
var cT = 0;
var cTturn = 0;
var turnedCards = [];
var aTurned = 0;
var toTurn = false;

var attempts = 0;
var attemptsP;

var minutes = 0;
var seconds = 0;
var timeP;

var start = false;

var startP;
var nameP;
var myNameP;

var btnRestart;

function setup() {
   createCanvas(1699, 1050);
   colorMode(RGB);
   rectMode(CENTER);

   btnRestart = createButton('Restart');
   btnRestart.position(width/2 - 78, 30);
   btnRestart.mousePressed(restart);
   btnRestart.style('font-size', '50');
   btnRestart.style('background-color', 'transparent');
   btnRestart.style('border', '0');
   btnRestart.style('outline', 'none');
   btnRestart.hide( );

   timeP = createElement('h1');
   timeP.style('font-size', '50px');
   timeP.position(55, -2);

   attemptsP = createElement('h1');
   attemptsP.style('font-size', '50px');
   attemptsP.position(width - 250, -2);

   startP =  createElement( 'h1' );
   nameP =   createElement( 'h1' );
   myNameP = createElement( 'h1' );

   startP.position((width/2) - 246.5  ,  (height/2) - 25 );
   startP.style('font-size', '60px');
   startP.html('Press Any Key to Start');

   nameP.position((width/2) - 216.5  ,  (height/2) - 225 );
   nameP.style('font-size', '60px');
   nameP.html('Memorize the Cards');

   myNameP.position((width/2) - 316.5  ,  (height/2) - 125 );
   myNameP.style('font-size', '60px');
   myNameP.html('Made by: Christos Soteriou');

   createCardTable( );
}

function draw() {
   background(204);

   touch4Start( );

   if(start) {

      push( );
      noFill( );
      stroke(0);
      strokeWeight(3);
      rect(width/2, 50, 200, 70);
      pop( );

      if(!allTurned( )) {
         seconds = floor((millis( ) - startT) / 1000) - minutes*60;
         minutes = floor(floor((millis( ) - startT) / 1000) / 60);
      }
      if (seconds < 10) {
         timeP.html('Time: ' + minutes + ':0' + seconds);
      }
      else {
         timeP.html('Time: ' + minutes + ':' + seconds);
      }

      attemptsP.html('Moves: ' + attempts);

      Turn( );

      var pressedCard = cardPressed( );
      if (pressedCard > -1 && !cards[pressedCard].turned) {
         cards[pressedCard].turned = true;
         turnedCards[aTurned] = pressedCard;
         aTurned++;
      }
      if(aTurned == 2) {
         attempts++;
         if(cards[turnedCards[0]].color == cards[turnedCards[1]].color) {
            aTurned = 0;
            turnedCards[0] = null;
            turnedCards[1] = null;
         }
         else {
            toTurn = true;
            cTturn = millis( );
            aTurned = 0;
         }

      }
      for(var i = 0; i < cards.length; i++) {
         cards[i].render( );
         // cards[i].turned = true;
      }
   }
}

function createCardTable( ) {
   completed = false;
   var colors = [];
   var hasColor = [];
   for(var i = 0; i < 14; i++) {
      colors[i] = false;
   }
   for(var i = 0; i < 14; i++) {
      hasColor[i] = false;
   }
   var cX = 150;
   var cY = 200;

   for(var i = 0; i < 28; i++) {
      var color = getColor(colors);
      if(!hasColor[color]) {
         hasColor[color] = true;
      }
      else {
         colors[color] = true;
      }
      cards[i] = new Card(cX, cY, color);
      cX += 200 + (100/3);
      if((i+1)%7 == 0) {
         cX  = 150;
         cY += 200 + (100/3);
      }
   }
   completed = true;
}

function getColor(array) {
   do {
      c = floor(random(0, 14));
   } while(array[c]);
   return c;
}

function cardPressed( ) {
   if(((mouseIsPressed && mouseButton == LEFT) || touch) && millis( ) - cT > 200 && completed && millis( ) - cTturn > 800) {
      for(var i = 0; i <  cards.length; i++) {
         var d  = dist(mouseX, mouseY, cards[i].pos.x, cards[i].pos.y);
         var dt = dist(touchX, touchY, cards[i].pos.x, cards[i].pos.y);
         if(d < cards[i].r || dt < cards[i].r) {
            return i;
         }
      }
      return -1;
   }
   else {
      return -1;
   }
}

function Turn( ) {
   if(toTurn && millis( ) - cTturn > 800) {
      cards[turnedCards[0]].turned = false;
      cards[turnedCards[1]].turned = false;

      turnedCards[0] = null;
      turnedCards[1] = null;

      toTurn = false;
   }
}

function touchStarted( ) {
   touch = true;
}

function touchEnded ( ) {
   touch = false;
}

function keyPressed( ) {
   if(!start) {
      startF( );
   }
}

function startF( ) {

         btnRestart.show( );

         startP .hide( );
         nameP  .hide( );
         myNameP.hide( );

         timeP    .show( );
         attemptsP.show( );

         startT = millis( );

         start = true;
}

function allTurned( ) {
   for (var i = 0; i < cards.length; i++) {
      if(!cards[i].turned) {
         return false;
      }
   }
   return true;
}

function touch4Start( ) {
   if(touch && !start) {
      startF( );
   }
}

function restart( ) {
   start = false;

   btnRestart.hide( );

   startP. show( );
   nameP.  show( );
   myNameP.show( );

   timeP    .hide( );
   attemptsP.hide( );

   aTurned = 0;
   attempts = 0;

   createCardTable( );
}

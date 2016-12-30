// Memory Game
// Made by: Christos Soteriou

// Press the correct colors in the right order

var lights = [4];
var lightsW_L = [2];

var roundR = 1;

var pattern = [];
var display = false;
var displayIndex = 0;

var flag = false;

var cTx = 0;
var cTy = 0;

var index = 0;

var win = false;
var lose = false;

var patternExists = false;

var roundP;
var startP;
var nameP;
var myNameP;

var touch = false;

var start = false;

function setup() {
   createCanvas(800, 390);
   // Lights Colors
   lights[0] = new Lights(100, 100, 0);
   lights[1] = new Lights(300, 100, 1);
   lights[2] = new Lights(500, 100, 2);
   lights[3] = new Lights(700, 100, 3);
   // Win / Lose
   lightsW_L[0] = new Lights(200, 290, 4);
   lightsW_L[1] = new Lights(600, 290, 5);

   colorMode(HSB);

   roundP =  createElement( 'h1' );
   startP =  createElement( 'h1' );
   nameP =   createElement( 'h1' );
   myNameP = createElement( 'h1' );

   roundP.position(360, 224);

   startP.position((width/2) - 130  ,  (height/2));
   startP.html('Press Any Key to Start');

   nameP.position((width/2) - 75  ,  (height/2) - 170 );
   nameP.html('Memory Game');

   myNameP.position((width/2) - 160  ,  (height/2) - 120 );
   myNameP.html('Made by: Christos Soteriou');


   generatePattern( );
}

function draw() {
   background(80);

   if(start) {
      startP.hide( );
      nameP.hide( );
      myNameP.hide( );

      var pBTNv = pBTN( );
      roundP.html('Round: ' + roundR);
      winF( );
      loseF( );
      displayPattern( );

      for(var i = 0; i < lights.length; i++) {
         lights[i].render( );
         lights[i].checkOn( );
      }

      for(var i = 0; i < lightsW_L.length; i++) {
         lightsW_L[i].render( );
         lightsW_L[i].checkOn( );
      }

      if(patternExists && pBTNv >= 0) {
         if(pBTNv == pattern[index]){
           index++;
         }
         else {
           lose = true;
         }
       }
       if(index == roundR) {
         win = true;
       }
    }
}

function winF( ) {
   if(win && lightsOff( )) {
      lightsW_L[0].on = true;
      lightsW_L[0].changeTime = millis( );
      index = 0;
      roundR++;
      win = false;
      generatePattern( );
   }
}

function loseF( ) {
   if(lose && lightsOff( )) {
      lose = false;
      lightsW_L[1].on = true;
      lightsW_L[1].changeTime = millis( );
      index = 0;
      roundR = 1;
      generatePattern( );
   }
}

function generatePattern( ) {
   randomSeed((frameRate( ) * millis( ) * day( ) * month( ) * second( )) - millis( ) * minute( ));
   patternExists = false;
   for(var i = 0; i < roundR; i++) {
      var lightOn = floor(random(0, 3.99));
      pattern[i] = lightOn;
   }
   display = true;
}

function displayPattern( ) {
   var bool2 = millis( ) - cTx > 500;
   if(display && lightsOff( ) && bool2) {
      if(!flag) {
         lights[pattern[displayIndex]].on = true;
         lights[pattern[displayIndex]].changeTime = millis( );
         displayIndex++;
      }
      if(displayIndex == roundR) {
         if(flag) {
            displayIndex = 0;
            display = false;
            flag = false;
            patternExists = true;
         }
         else {
            flag = true;
         }
      }
   }
}

function pBTN( ) {

   var d0 = dist(mouseX, mouseY, lights[0].pos.x, lights[0].pos.y);
   var d0t = dist(touchX, touchY, lights[0].pos.x, lights[0].pos.y);

   var d1 = dist(mouseX, mouseY, lights[1].pos.x, lights[1].pos.y);
   var d1t = dist(touchX, touchY, lights[1].pos.x, lights[1].pos.y);

   var d2 = dist(mouseX, mouseY, lights[2].pos.x, lights[2].pos.y);
   var d2t = dist(touchY, touchY, lights[2].pos.x, lights[2].pos.y);

   var d3 = dist(mouseX, mouseY, lights[3].pos.x, lights[3].pos.y);
   var d3t = dist(touchX, touchY, lights[3].pos.x, lights[3].pos.y);

   if(((mouseIsPressed && mouseButton == LEFT) || touch) && millis( ) - cTy > 300 && patternExists) {
      if(d0 < lights[0].r*2 || d0t < lights[0].r*2) {
         lights[0].pressed = true;
         lights[0].changeTimeP = millis( );
         cTy = millis( );
         return 0;
      }
      else if(d1 < lights[1].r*2 || d1t < lights[1].r*2) {
         lights[1].pressed = true;
         lights[1].changeTimeP = millis( );
         cTy = millis( );
         return 1;
      }
      else if(d2 < lights[2].r*2 || d2t < lights[2].r*2) {
         lights[2].pressed = true;
         lights[2].changeTimeP = millis( );
         cTy = millis( );
         return 2;
      }
      else if(d3 < lights[3].r*2 || d3t < lights[3].r*2) {
         lights[3].pressed = true;
         lights[3].changeTimeP = millis( );
         cTy = millis( );
         return 3;
      }
      else {
         return -1;
      }
   }
   else {
      return -1;
   }
}

function lightsOff( ) {
   return !lights[0].on && !lights[1].on && !lights[2].on && !lights[3].on && !lightsW_L[0].on && !lightsW_L[1].on
}

function touchStarted( ) {
   touch = true;
}

function touchEnded( ) {
   touch = false;
}

function keyPressed( ) {
   if (!start) {
      start = true;
   }
}
